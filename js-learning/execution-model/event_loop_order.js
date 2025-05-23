// Demo 1: Basic Event Loop Order
console.log("Demo 1: Basic Event Loop Order");
console.log("1. Script Start");
debugger;
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