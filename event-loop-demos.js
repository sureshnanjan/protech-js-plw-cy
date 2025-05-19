// Demo 1: Basic Event Loop Order
console.log("Demo 1: Basic Event Loop Order");
console.log("1. Script Start");

// setTimeout represents the Timer queue
setTimeout(() => {
  console.log("4. setTimeout callback (Timer queue)");
}, 0);

// setImmediate represents the Check queue
setImmediate(() => {
  console.log("5. setImmediate callback (Check queue)");
});

// process.nextTick represents the NextTick queue (part of microtasks)
process.nextTick(() => {
  console.log("3. nextTick callback (Microtask queue)");
});

// Promise callbacks go to the Promise queue (also part of microtasks)
Promise.resolve().then(() => {
  console.log("2. Promise callback (Microtask queue)");
});

console.log("1. Script End");
console.log("-".repeat(50));

// Demo 2: Queue Priorities
console.log("\nDemo 2: Queue Priorities");
console.log("1. Script Start");

// Demonstrating the priority and order of execution
setTimeout(() => {
  console.log("4. Timer queue");
  
  // Nested callbacks to demonstrate queue order
  process.nextTick(() => console.log("5. nextTick inside Timer"));
  Promise.resolve().then(() => console.log("6. Promise inside Timer"));
}, 0);

setImmediate(() => {
  console.log("7. Check queue (setImmediate)");
});

process.nextTick(() => {
  console.log("2. nextTick queue (highest priority)");
});

Promise.resolve().then(() => {
  console.log("3. Promise queue (microtask)");
});

console.log("1. Script End");
console.log("-".repeat(50));

// Demo 3: I/O Events
console.log("\nDemo 3: I/O Events");
const fs = require('fs');

console.log("1. Script Start");

// File I/O operations go to the I/O queue
fs.readFile(__filename, () => {
  console.log("5. I/O callback (file read)");
  
  // These will run after the I/O callback
  setTimeout(() => console.log("7. setTimeout inside I/O"), 0);
  setImmediate(() => console.log("6. setImmediate inside I/O"));
});

// Timer queue
setTimeout(() => {
  console.log("4. Timer queue");
}, 0);

// Check queue
setImmediate(() => {
  console.log("8. Check queue");
});

// NextTick queue (microtask)
process.nextTick(() => {
  console.log("2. nextTick queue");
});

// Promise queue (microtask)
Promise.resolve().then(() => {
  console.log("3. Promise queue");
});

console.log("1. Script End");
console.log("-".repeat(50));

// Demo 4: Microtask Starvation
console.log("\nDemo 4: Microtask Starvation");
console.log("1. Script Start");

// Demonstrating how microtasks can starve the event loop
setTimeout(() => {
  console.log("4. Timer callback - this had to wait!");
}, 0);

let counter = 0;
function scheduleMicrotask() {
  counter++;
  if (counter <= 3) {
    console.log(`3. Microtask ${counter} executing`);
    
    // Schedule another microtask - this creates a chain
    // In real scenarios, this could lead to starvation
    process.nextTick(scheduleMicrotask);
  }
}

// Start the chain of microtasks
process.nextTick(scheduleMicrotask);

console.log("2. Script End");
console.log("-".repeat(50));

// Demo 5: Combined Nested Queues
console.log("\nDemo 5: Combined Nested Queues");
console.log("1. Script Start");

setTimeout(() => {
  console.log("4. Timer Phase (setTimeout 0)");
  
  process.nextTick(() => {
    console.log("5. nextTick inside setTimeout");
  });
  
  Promise.resolve().then(() => {
    console.log("6. Promise inside setTimeout");
  });
  
  setTimeout(() => {
    console.log("9. Nested setTimeout");
  }, 0);
  
  setImmediate(() => {
    console.log("8. setImmediate inside setTimeout");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise (microtask)");
});

process.nextTick(() => {
  console.log("2. nextTick (microtask with higher priority)");
});

setImmediate(() => {
  console.log("7. Check Phase (setImmediate)");
});

console.log("1. Script End");
console.log("-".repeat(50));

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
