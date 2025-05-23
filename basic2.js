// JavaScript Objects and Prototypes Examples

// ===== PART 1: BASIC OBJECTS =====
console.log("===== PART 1: BASIC OBJECTS =====");

// Example 1: Object Literals
console.log("\nExample 1: Object Literals");

// const person = {
//   firstName: "John",
//   lastName: "Doe",
//   age: 30,
//   greet() {
//     console.log(`Hello, my name is ${this.firstName} ${this.lastName} im ${this.age} years old`);
//   }
// };
// console.log(person);
// person.greet();


const myname = {
    fn: 'feroz',
    ln: 'jamal',
    age: 30,
    greet() {
        console.log(`hey, my name is ${this.fn} ${this.ln} Im ${this.age} years old` );
    }
};

console.log(myname);
myname.greet();