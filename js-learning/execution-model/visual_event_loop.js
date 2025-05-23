// Demo 6: Visual Event Loop Representation
console.log("\nDemo 6: Visual Event Loop Representation");

function visualEventLoop() {
  console.log("Starting Event Loop Visualization");
  
  console.log("1. Call Stack: Executing synchronous code");
  
  // Simulating microtask queue (process.nextTick and Promises)
  console.log("2. Microtask Queue processing after Call Stack is empty");
  
  // Simulating the phases in order
  console.log("3. Timers: Checking for expired setTimeout/setInterval callbacks");
  console.log("4. Pending Callbacks: Executing I/O callbacks");
  console.log("5. Idle, Prepare: Internal phases");
  console.log("6. Poll: Retrieving new I/O events");
  console.log("7. Check: Executing setImmediate callbacks");
  console.log("8. Close Callbacks: Handling close events");
  
  console.log("Event Loop Iteration Complete");
  console.log("If there are pending tasks, the loop continues...");
  console.log("If no more tasks, the program exits");
}

visualEventLoop();
