// JavaScript Objects and Prototypes Examples

// ===== PART 1: BASIC OBJECTS =====
console.log("===== PART 1: BASIC OBJECTS =====");

// Example 1: Object Literals
console.log("\nExample 1: Object Literals");

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  greet() {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
  }
};

console.log(person);
person.greet();

// Adding, modifying, and deleting properties
person.email = "john@example.com";  // Adding a new property
person.age = 31;                    // Modifying existing property
delete person.email;                // Deleting a property

console.log("After modifications:", person);

// Object property access methods
console.log("\nAccessing object properties:");
console.log("Dot notation:", person.firstName);
console.log("Bracket notation:", person["lastName"]);

// Dynamic property access
const propertyName = "age";
console.log("Dynamic access:", person[propertyName]);

// ===== PART 2: OBJECTS AND CONSTRUCTORS =====
console.log("\n===== PART 2: OBJECTS AND CONSTRUCTORS =====");

// Example 2: Constructor Functions
console.log("\nExample 2: Constructor Functions");

function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  
  // Method defined inside constructor
  this.greet = function() {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
  };
}

const john = new Person("John", "Doe", 30);
const jane = new Person("Jane", "Smith", 28);

console.log(john);
john.greet();
jane.greet();

// Check that each instance has its own copy of the method
console.log("Do instances share the same greet method?", john.greet === jane.greet); // false

// Example 3: ES6 Classes (syntactic sugar over prototypes)
console.log("\nExample 3: ES6 Classes");

class PersonClass {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
  }
  
  // Getter method
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  // Static method
  static createAnonymous() {
    return new PersonClass("Anonymous", "User", 0);
  }
}

const jack = new PersonClass("Jack", "Wilson", 35);
console.log(jack);
jack.greet();
console.log("Full name via getter:", jack.fullName);

const anonymous = PersonClass.createAnonymous();
console.log("Anonymous user:", anonymous);

// ===== PART 3: PROTOTYPES =====
console.log("\n===== PART 3: PROTOTYPES =====");

// Example 4: Constructor with Prototype
console.log("\nExample 4: Constructor with Prototype");

function Employee(name, position, salary) {
  this.name = name;
  this.position = position;
  this.salary = salary;
}

// Methods added to prototype - shared by all instances
Employee.prototype.introduce = function() {
  console.log(`Hi, I'm ${this.name} and I work as a ${this.position}`);
};

Employee.prototype.calculateMonthlyPay = function() {
  return this.salary / 12;
};

const emp1 = new Employee("Alice Johnson", "Developer", 90000);
const emp2 = new Employee("Bob Smith", "Designer", 75000);

emp1.introduce();
console.log(`${emp1.name}'s monthly salary: $${emp1.calculateMonthlyPay()}`);
emp2.introduce();

// Check that all instances share the same method (memory efficient)
console.log("Do instances share the same introduce method?", emp1.introduce === emp2.introduce); // true

// Example 5: Accessing Prototype
console.log("\nExample 5: Accessing Prototype");

// Different ways to access an object's prototype
console.log("emp1.__proto__:", emp1.__proto__);  // Older, deprecated way
console.log("Object.getPrototypeOf(emp1):", Object.getPrototypeOf(emp1)); // Modern way
console.log("Employee.prototype:", Employee.prototype);
console.log("Are they the same?", emp1.__proto__ === Employee.prototype); // true

// Example 6: Prototype Chain
console.log("\nExample 6: Prototype Chain");

console.log("Employee.prototype.__proto__ === Object.prototype:", 
            Employee.prototype.__proto__ === Object.prototype); // true

// Object prototype methods
console.log("emp1.hasOwnProperty('name'):", emp1.hasOwnProperty('name')); // true
console.log("emp1.hasOwnProperty('introduce'):", emp1.hasOwnProperty('introduce')); // false
console.log("emp1.toString():", emp1.toString()); // Inherited from Object.prototype

// ===== PART 4: PROTOTYPE INHERITANCE =====
console.log("\n===== PART 4: PROTOTYPE INHERITANCE =====");

// Example 7: Inheritance with prototypes
console.log("\nExample 7: Inheritance with Prototypes");

// Base constructor
function Animal(name) {
  this.name = name;
}

// Base prototype methods
Animal.prototype.eat = function() {
  console.log(`${this.name} is eating.`);
};

Animal.prototype.sleep = function() {
  console.log(`${this.name} is sleeping.`);
};

// Derived constructor
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor (similar to super())
  this.breed = breed;
}

// Setup prototype chain: Dog -> Animal -> Object
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

// Add Dog-specific methods
Dog.prototype.bark = function() {
  console.log(`${this.name} says Woof!`);
};

// Create instances
const animal = new Animal("Generic Animal");
const dog = new Dog("Rex", "German Shepherd");

animal.eat();
dog.eat();    // Inherited from Animal
dog.bark();   // Dog-specific method
console.log(dog);

// Verifying the prototype chain
console.log("\nPrototype chain verification:");
console.log("dog.__proto__ === Dog.prototype:", dog.__proto__ === Dog.prototype); // true
console.log("Dog.prototype.__proto__ === Animal.prototype:", Dog.prototype.__proto__ === Animal.prototype); // true
console.log("dog instanceof Dog:", dog instanceof Dog); // true
console.log("dog instanceof Animal:", dog instanceof Animal); // true
console.log("dog instanceof Object:", dog instanceof Object); // true

// Example 8: ES6 Class Inheritance (cleaner syntax for the same prototype mechanism)
console.log("\nExample 8: ES6 Class Inheritance");

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  
  getInfo() {
    return `${this.year} ${this.make} ${this.model}`;
  }
  
  start() {
    console.log("Starting vehicle...");
  }
}

class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year); // Call parent constructor
    this.doors = doors;
  }
  
  // Override parent method
  start() {
    super.start(); // Call parent method
    console.log("Car engine started!");
  }
  
  // Add new method
  honk() {
    console.log("Beep beep!");
  }
}

const genericVehicle = new Vehicle("Generic", "Vehicle", 2020);
const myCar = new Car("Toyota", "Corolla", 2022, 4);

console.log(genericVehicle.getInfo());
genericVehicle.start();

console.log(myCar.getInfo());
myCar.start();
myCar.honk();

// Verify inheritance
console.log("myCar instanceof Car:", myCar instanceof Car); // true
console.log("myCar instanceof Vehicle:", myCar instanceof Vehicle); // true

// ===== PART 5: ADVANCED PROTOTYPE TECHNIQUES =====
console.log("\n===== PART 5: ADVANCED PROTOTYPE TECHNIQUES =====");

// Example 9: Object.create()
console.log("\nExample 9: Object.create()");

// Create prototype object
const personProto = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
  
  farewell() {
    console.log(`Goodbye from ${this.name}`);
  }
};

// Create objects based on the prototype
const ada = Object.create(personProto);
ada.name = "Ada Lovelace";

const alan = Object.create(personProto, {
  name: {
    value: "Alan Turing",
    writable: true,
    enumerable: true
  },
  profession: {
    value: "Mathematician",
    writable: false
  }
});

ada.greet();
alan.greet();
alan.farewell();

console.log(alan);
console.log("alan.__proto__ === personProto:", alan.__proto__ === personProto);

// Try to change non-writable property
console.log("Alan's profession:", alan.profession);
alan.profession = "Computer Scientist"; // This won't work
console.log("Alan's profession after attempted change:", alan.profession); // Still "Mathematician"

// Example 10: Property Descriptors
console.log("\nExample 10: Property Descriptors");

const product = {
  name: "Laptop",
  price: 1000,
  manufacturer: "Tech Co."
};

// Define a non-enumerable property
Object.defineProperty(product, "id", {
  value: "PRO-12345",
  enumerable: false, // Won't show up in for...in or Object.keys()
  writable: false,   // Can't be changed
  configurable: false // Can't be deleted or reconfigured
});

// Define a computed property with getter/setter
Object.defineProperty(product, "discountPrice", {
  get() {
    return this.price * 0.9; // 10% discount
  },
  set(value) {
    this.price = value / 0.9;
  },
  enumerable: true
});

console.log("Product:", product);
console.log("Product ID (non-enumerable):", product.id);
console.log("Discount price (getter):", product.discountPrice);

// Set price via the setter
product.discountPrice = 900;
console.log("Price after setting discount price:", product.price); // ≈ 1000

// Enumerating properties
console.log("\nEnumerating properties:");
console.log("Object.keys():", Object.keys(product)); // id is not included (non-enumerable)

// Getting all properties, including non-enumerable ones
console.log("Object.getOwnPropertyNames():", Object.getOwnPropertyNames(product));

// Example 11: Mixins
console.log("\nExample 11: Mixins");

// A mixin is a way to add functionality without inheritance
const flyMixin = {
  fly() {
    console.log(`${this.name} is flying!`);
  },
  land() {
    console.log(`${this.name} landed.`);
  }
};

const swimMixin = {
  swim() {
    console.log(`${this.name} is swimming.`);
  }
};

// Bird constructor
function Bird(name, species) {
  this.name = name;
  this.species = species;
}

// Make birds fly
Object.assign(Bird.prototype, flyMixin);

// Duck constructor (inherits from Bird)
function Duck(name) {
  Bird.call(this, name, "Duck");
}
Duck.prototype = Object.create(Bird.prototype);
Duck.prototype.constructor = Duck;

// Make ducks swim too
Object.assign(Duck.prototype, swimMixin);

const eagle = new Bird("Eddie", "Eagle");
const duck = new Duck("Donald");

eagle.fly();  // From flyMixin
duck.fly();   // Inherited from Bird
duck.swim();  // From swimMixin added to Duck

// Example 12: Using Object.setPrototypeOf()
console.log("\nExample 12: Using Object.setPrototypeOf()");

const machine = {
  isOn: false,
  turnOn() {
    this.isOn = true;
    console.log("Machine turned on");
  },
  turnOff() {
    this.isOn = false;
    console.log("Machine turned off");
  }
};

// Create a computer object
const computer = {
  ram: "16GB",
  cpu: "3.4GHz",
  boot() {
    console.log("Computer booting up...");
    this.turnOn();
  }
};

// Set the prototype after object creation
Object.setPrototypeOf(computer, machine);

computer.boot();
console.log("Is computer on?", computer.isOn);
computer.turnOff();
console.log("Computer:", computer);
console.log("computer.__proto__ === machine:", Object.getPrototypeOf(computer) === machine);
