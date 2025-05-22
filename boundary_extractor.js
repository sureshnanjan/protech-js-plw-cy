/**
 * Boundary Extractor Utility
 * 
 * A flexible utility to extract content between specified boundaries in text.
 * Can be used as a post-processor for API requests or any text processing pipeline.
 */

class BoundaryExtractor {
  /**
   * Create a boundary extractor
   * @param {Object} options - Configuration options
   * @param {string|RegExp} options.startBoundary - The starting boundary marker
   * @param {string|RegExp} options.endBoundary - The ending boundary marker
   * @param {boolean} options.includeDelimiters - Whether to include boundary markers in result (default: false)
   * @param {boolean} options.multipleMatches - Whether to extract all matching segments (default: true)
   * @param {boolean} options.trimResult - Whether to trim whitespace from results (default: true)
   */
  constructor(options = {}) {
    this.options = {
      startBoundary: null,
      endBoundary: null,
      includeDelimiters: false,
      multipleMatches: true,
      trimResult: true,
      ...options
    };
    
    this.validateOptions();
  }
  
  validateOptions() {
    if (!this.options.startBoundary && !this.options.endBoundary) {
      throw new Error('At least one boundary (start or end) must be specified');
    }
  }
  
  /**
   * Extract content based on configured boundaries
   * @param {string} text - The text to extract content from
   * @returns {string|string[]} - Extracted content (array if multipleMatches is true)
   */
  extract(text) {
    if (!text) return this.options.multipleMatches ? [] : null;
    
    const { startBoundary, endBoundary, includeDelimiters, multipleMatches, trimResult } = this.options;
    
    let results = [];
    let startIndex = 0;
    let endIndex = 0;
    let currentPosition = 0;
    
    while (currentPosition < text.length) {
      // Find start boundary
      if (startBoundary) {
        if (startBoundary instanceof RegExp) {
          const startMatch = text.slice(currentPosition).match(startBoundary);
          if (!startMatch) break;
          
          startIndex = currentPosition + startMatch.index;
          currentPosition = startIndex + startMatch[0].length;
          
          if (!includeDelimiters) {
            startIndex = currentPosition;
          } else {
            startIndex = startIndex;
          }
        } else {
          startIndex = text.indexOf(startBoundary, currentPosition);
          if (startIndex === -1) break;
          
          currentPosition = startIndex + startBoundary.length;
          
          if (!includeDelimiters) {
            startIndex = currentPosition;
          }
        }
      } else {
        // No start boundary, start from current position
        startIndex = currentPosition;
      }
      
      // Find end boundary
      if (endBoundary) {
        if (endBoundary instanceof RegExp) {
          const endMatch = text.slice(currentPosition).match(endBoundary);
          if (!endMatch) break;
          
          endIndex = currentPosition + endMatch.index;
          
          if (includeDelimiters) {
            currentPosition = endIndex + endMatch[0].length;
            endIndex = currentPosition;
          } else {
            currentPosition = endIndex + endMatch[0].length;
          }
        } else {
          endIndex = text.indexOf(endBoundary, currentPosition);
          if (endIndex === -1) break;
          
          if (includeDelimiters) {
            currentPosition = endIndex + endBoundary.length;
            endIndex = currentPosition;
          } else {
            currentPosition = endIndex + endBoundary.length;
          }
        }
      } else {
        // No end boundary, extract until the end
        endIndex = text.length;
        currentPosition = text.length;
      }
      
      let result = text.substring(startIndex, endIndex);
      if (trimResult) result = result.trim();
      
      results.push(result);
      
      if (!multipleMatches) break;
    }
    
    return multipleMatches ? results : (results.length > 0 ? results[0] : null);
  }
  
  /**
   * Create a post-processor function that can be attached to request pipelines
   * @returns {Function} A function that can be used as a post-processor
   */
  asPostProcessor() {
    return (response) => {
      if (typeof response === 'string') {
        return this.extract(response);
      } else if (response && typeof response === 'object') {
        // Handle common response objects with text/body properties
        if (response.text) {
          return this.extract(response.text);
        } else if (response.body) {
          return this.extract(
            typeof response.body === 'string' ? response.body : JSON.stringify(response.body)
          );
        } else if (response.data) {
          return this.extract(
            typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
          );
        }
      }
      
      // Fall back to stringifying the entire response
      return this.extract(JSON.stringify(response));
    };
  }
}

// Example usage with a common request library
function attachExtractorToRequest(requestFunction, extractorOptions) {
  const extractor = new BoundaryExtractor(extractorOptions);
  
  return async function(...args) {
    const response = await requestFunction(...args);
    return extractor.asPostProcessor()(response);
  };
}

// Export the utility
module.exports = {
  BoundaryExtractor,
  attachExtractorToRequest
};
