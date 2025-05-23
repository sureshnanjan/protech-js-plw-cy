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