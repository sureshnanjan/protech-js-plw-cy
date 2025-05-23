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