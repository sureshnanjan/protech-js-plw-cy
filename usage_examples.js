/**
 * Usage Examples for the Boundary Extractor
 *
 * These examples show how to use the BoundaryExtractor with different 
 * request libraries and in various scenarios.
 */

const { BoundaryExtractor, attachExtractorToRequest } = require('./boundary_extractor');

// Example 1: Basic extraction with string boundaries
function basicExample() {
  const text = `
    <header>Website Header</header>
    <main>
      <article>
        This is the main content.
        <div class="important">Important information here!</div>
      </article>
    </main>
    <footer>Website Footer</footer>
  `;

  // Extract content between <main> and </main>
  const mainContentExtractor = new BoundaryExtractor({
    startBoundary: '<main>',
    endBoundary: '</main>',
    includeDelimiters: false
  });

  const mainContent = mainContentExtractor.extract(text);
  console.log('Main content:', mainContent);

  // Extract all div elements with their tags
  const divExtractor = new BoundaryExtractor({
    startBoundary: '<div',
    endBoundary: '</div>',
    includeDelimiters: true,
    multipleMatches: true
  });

  const divs = divExtractor.extract(text);
  console.log('Divs found:', divs);
}

// Example 2: Using with regex boundaries
function regexExample() {
  const text = `
    User ID: 12345
    Name: John Doe
    Email: john@example.com
    
    User ID: 67890
    Name: Jane Smith
    Email: jane@example.com
  `;

  // Extract all user blocks
  const userExtractor = new BoundaryExtractor({
    startBoundary: /User ID: \d+/,
    endBoundary: /Email: .*?(?=\n\s*\n|$)/,
    includeDelimiters: true
  });

  const users = userExtractor.extract(text);
  console.log('Users found:', users);

  // Extract all email addresses
  const emailExtractor = new BoundaryExtractor({
    startBoundary: /Email: /,
    endBoundary: /\n/,
    includeDelimiters: false
  });

  const emails = emailExtractor.extract(text);
  console.log('Emails:', emails);
}

// Example 3: Using with fetch API (browser environment)
async function fetchWithExtractor() {
  // Create a fetch function with an extractor attached
  const fetchHTML = attachExtractorToRequest(fetch, {
    startBoundary: '<body>',
    endBoundary: '</body>',
    includeDelimiters: false
  });

  try {
    // This will fetch the URL and automatically extract content between <body> tags
    const bodyContent = await fetchHTML('https://example.com');
    console.log('Page body content:', bodyContent);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 4: Using with Node.js request libraries
async function nodeRequestExample() {
  // With axios
  async function axiosExample() {
    const axios = require('axios');
    
    // Create an axios instance with JSON extraction
    const jsonExtractor = new BoundaryExtractor({
      startBoundary: '"data":',
      endBoundary: /,"\w+":|}$/,
      includeDelimiters: false
    });
    
    // Make request and apply extractor to the response
    const response = await axios.get('https://api.example.com/data');
    const extractedData = jsonExtractor.asPostProcessor()(response);
    
    return extractedData;
  }
  
  // With Node.js native http module
  function httpExample() {
    const https = require('https');
    
    return new Promise((resolve, reject) => {
      // Create an XML extractor for a specific tag
      const xmlExtractor = new BoundaryExtractor({
        startBoundary: '<result>',
        endBoundary: '</result>',
        multipleMatches: true
      });
      
      https.get('https://api.example.com/xml', (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          // Process the complete response with the extractor
          const results = xmlExtractor.extract(data);
          resolve(results);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }
  
  try {
    console.log('Axios result:', await axiosExample());
    console.log('HTTP result:', await httpExample());
  } catch (error) {
    console.error('Request error:', error);
  }
}

// Example 5: Using as middleware in Express.js
function expressMiddlewareExample() {
  const express = require('express');
  const app = express();
  
  // Middleware to extract and attach JSON fields to the request
  function extractJsonFields(req, res, next) {
    if (req.body && typeof req.body === 'object') {
      const jsonString = JSON.stringify(req.body);
      
      // Extract specific sections from the JSON
      const configExtractor = new BoundaryExtractor({
        startBoundary: '"config":{',
        endBoundary: '}',
        includeDelimiters: true
      });
      
      const metadataExtractor = new BoundaryExtractor({
        startBoundary: '"metadata":{',
        endBoundary: '}',
        includeDelimiters: true
      });
      
      // Add extracted data to request for use in route handlers
      req.extractedConfig = configExtractor.extract(jsonString);
      req.extractedMetadata = metadataExtractor.extract(jsonString);
    }
    
    next();
  }
  
  // Use the middleware
  app.use(express.json());
  app.use(extractJsonFields);
  
  // Route that uses the extracted data
  app.post('/process', (req, res) => {
    res.json({
      processedConfig: req.extractedConfig,
      processedMetadata: req.extractedMetadata
    });
  });
  
  // Start server
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

// Example 6: Using in a service class
class ContentService {
  constructor() {
    // Create reusable extractors
    this.titleExtractor = new BoundaryExtractor({
      startBoundary: '<title>',
      endBoundary: '</title>'
    });
    
    this.scriptExtractor = new BoundaryExtractor({
      startBoundary: '<script',
      endBoundary: '</script>',
      includeDelimiters: true,
      multipleMatches: true
    });
    
    this.jsonExtractor = new BoundaryExtractor({
      startBoundary: /\{/,
      endBoundary: /\}/,
      includeDelimiters: true,
      multipleMatches: true
    });
  }
  
  async processWebpage(url) {
    // Fetch the webpage (implementation depends on environment)
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract different components
    return {
      title: this.titleExtractor.extract(html),
      scripts: this.scriptExtractor.extract(html),
      // Find JSON data in the scripts
      jsonData: this.scriptExtractor.extract(html)
        .map(script => this.jsonExtractor.extract(script))
        .filter(json => json.length > 0)
        .flat()
    };
  }
}

// Run the examples
(async () => {
  console.log('--- Basic Example ---');
  basicExample();
  
  console.log('\n--- Regex Example ---');
  regexExample();
  
  // Browser-only example
  if (typeof window !== 'undefined') {
    console.log('\n--- Fetch Example ---');
    await fetchWithExtractor();
  }
  
  // Node.js-only examples (comment out if running in browser)
  /*
  console.log('\n--- Node.js Request Example ---');
  await nodeRequestExample();
  
  console.log('\n--- Express.js Middleware Example ---');
  expressMiddlewareExample();
  */
  
  console.log('\n--- Service Class Example ---');
  const contentService = new ContentService();
  // Usage example (uncomment if in appropriate environment):
  // const processedContent = await contentService.processWebpage('https://example.com');
  // console.log('Processed content:', processedContent);
})();
