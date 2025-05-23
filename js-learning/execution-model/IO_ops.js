// Demo 3: I/O Events
console.log("\nDemo 3: I/O Events");
const { readFile } = require('fs');

console.log("1. Script Start");

// File I/O operations go to the I/O queue
readFile(__filename, () => {
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

Promise.resolve()
  .then(() => {
    console.log("Promise resolved");
    dosomeThing();
  })
  .catch((err) => {
    console.error("Error:", err);
  });


