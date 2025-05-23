// app.js
async function fetchData() {
    debugger; // This will pause execution
    
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    
    console.log('Data received:', data);
    return data;
}

// Set breakpoints here to see call stack
fetchData()
    .then(result => console.log('Success:', result))
    .catch(error => console.error('Error:', error));