// WHY WE NEED OBJECTS: PRACTICAL DEMONSTRATIONS
// This file demonstrates why primitive datatypes alone aren't sufficient for real-world programming

// ===== PART 1: LIMITATIONS OF PRIMITIVE TYPES =====
console.log("===== PART 1: LIMITATIONS OF PRIMITIVE TYPES =====");

// Primitive types in JavaScript
const myString = "Hello World"; // String
const myNumber = 42; // Number 100, 100.2
const myBoolean = true;
const myUndefined = undefined;
const myNull = null;

// In ES6+: Symbol and BigInt are also primitive types




loopindex = loopindex + 1;
loopindex += 1;

const trainer = { 'first name': "Suresh", age: 25, isAdmin: false};

const report = `I am ${trainer['first name']} and I am ${trainer.age} years old.`;

report = "some string";

// Object literal syntax
// let , var , const

// Accessing properties of an object
trainer['age']; // "Suresh"
trainer['first name']; // "Suresh" (using bracket notation)




// Primitive types are immutable and cannot hold complex data
var myObject = {};



// Problem 1: Representing complex data with primitives
console.log("\nProblem 1: Representing user data with primitives");

// Without objects - using separate variables (messy and disconnected)
const userName = "John Doe";
const userAge = 30;
const userEmail = "john@example.com";
const userIsAdmin = false;

// Accessing user data requires remembering multiple variable names
console.log(`User: ${userName}, ${userAge} years old, Email: ${userEmail}`);

// What if we need multiple users? Things get very messy very quickly!
const user1Name = "John Doe";
const user1Age = 30;
const user1Email = "john@example.com";
const user2Name = "Jane Smith";
const user2Age = 28;
const user2Email = "jane@example.com";

// This becomes unwieldy and error-prone
console.log(`Users: ${user1Name} (${user1Age}) and ${user2Name} (${user2Age})`);

// Problem 2: No way to attach behaviors/functions to data
console.log("\nProblem 2: No way to attach behaviors to data");

// With primitives, functions are separate from the data they operate on
function getFullUserInfo(name, age, email) {
  return `${name} is ${age} years old. Contact at: ${email}`;
}

console.log(getFullUserInfo(user1Name, user1Age, user1Email));

// We have to pass all related data every time, increasing chances of errors
// What if we accidentally mix up parameters?
console.log(getFullUserInfo(user2Email, user2Age, user2Name)); // Wrong order!

// Problem 3: No encapsulation or information hiding
console.log("\nProblem 3: No encapsulation or information hiding");

// With primitives, all data is directly accessible and modifiable
let bankAccountBalance = 1000;
let bankAccountPin = "1234";

// Any part of the code can modify the balance directly
function depositMoney(amount) {
  bankAccountBalance += amount; // No validation, no security
}

// No way to protect sensitive data
console.log(`Anyone can see the PIN: ${bankAccountPin}`);

// ===== PART 2: HOW OBJECTS SOLVE THESE PROBLEMS =====
console.log("\n===== PART 2: HOW OBJECTS SOLVE THESE PROBLEMS =====");

// Solution 1: Objects group related data together
console.log("\nSolution 1: Objects group related data");

// Single object represents a complete entity
const user = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  isAdmin: false
};

// Easy to access all properties via a single variable
console.log(`User: ${user.name}, ${user.age} years old, Email: ${user.email}`);

// Managing multiple users becomes trivial
const users = [
  {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    isAdmin: false
  },
  {
    name: "Jane Smith",
    age: 28,
    email: "jane@example.com",
    isAdmin: true
  }
];

// Easy to iterate through multiple users
users.forEach(user => {
  console.log(`${user.name} (${user.age}): ${user.isAdmin ? "Admin" : "Regular User"}`);
});

// Solution 2: Objects combine data with behavior
console.log("\nSolution 2: Objects combine data with behavior");

const userWithMethods = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  isAdmin: false,
  
  // Methods (behavior) attached directly to the data
  getFullInfo() {
    return `${this.name} is ${this.age} years old. Contact at: ${this.email}`;
  },
  
  greet(otherPerson) {
    return `Hello ${otherPerson}, my name is ${this.name}!`;
  },
  
  // Data and behavior are bundled together
  celebrateBirthday() {
    this.age++; // Can access and modify its own data
    return `Happy Birthday! ${this.name} is now ${this.age} years old`;
  }
};

console.log(userWithMethods.getFullInfo());
console.log(userWithMethods.greet("Bob"));
console.log(userWithMethods.celebrateBirthday());

// Solution 3: Objects enable encapsulation
console.log("\nSolution 3: Objects enable encapsulation");

// Using closure for private variables (pre-ES2022 approach)
function createBankAccount(initialBalance, pin) {
  // Private variables (not accessible from outside)
  let balance = initialBalance;
  const secretPin = pin;
  
  // Public interface
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited $${amount}. New balance: $${balance}`;
      }
      return "Invalid deposit amount";
    },
    
    withdraw(enteredPin, amount) {
      // Validate PIN before allowing withdrawal
      if (enteredPin !== secretPin) {
        return "Incorrect PIN";
      }
      
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `Withdrew $${amount}. New balance: $${balance}`;
      }
      return "Invalid withdrawal amount";
    },
    
    getBalance(enteredPin) {
      if (enteredPin === secretPin) {
        return balance;
      }
      return "Incorrect PIN";
    }
  };
}

const account = createBankAccount(1000, "1234");

console.log(account.deposit(500));
console.log(account.withdraw("1234", 200));
console.log(account.withdraw("wrong", 100)); // Security!
console.log(`Balance with correct PIN: ${account.getBalance("1234")}`);
console.log(`Balance with wrong PIN: ${account.getBalance("wrong")}`);

// Encapsulation prevents direct access to internal data
console.log("Can we access the PIN or balance directly?");
console.log(`Direct access to balance: ${account.balance}`); // Undefined
console.log(`Direct access to secretPin: ${account.secretPin}`); // Undefined

// ===== PART 3: REAL-WORLD PRACTICAL EXAMPLES =====
console.log("\n===== PART 3: REAL-WORLD PRACTICAL EXAMPLES =====");

// Example 1: Building a product inventory system
console.log("\nExample 1: Product Inventory System");

// Product constructor for creating similar objects efficiently
function Product(id, name, price, stock) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.stock = stock;
  
  // Discount calculation
  this.applyDiscount = function(percentage) {
    const discountAmount = (percentage / 100) * this.price;
    return this.price - discountAmount;
  };
  
  // Inventory management
  this.reduceStock = function(quantity) {
    if (quantity <= this.stock) {
      this.stock -= quantity;
      return true;
    }
    return false;
  };
}

// Creating product inventory
const inventory = [
  new Product(101, "Laptop", 999.99, 15),
  new Product(102, "Smartphone", 699.99, 25),
  new Product(103, "Headphones", 149.99, 40)
];

// Show inventory
console.log("Current Inventory:");
inventory.forEach(product => {
  console.log(`${product.name}: $${product.price} (${product.stock} in stock)`);
});

// Process an order (simulated)
console.log("\nProcessing order...");
const orderedLaptops = 2;
const laptopProduct = inventory[0];

if (laptopProduct.reduceStock(orderedLaptops)) {
  const discountPrice = laptopProduct.applyDiscount(10);
  console.log(`Order successful: ${orderedLaptops} ${laptopProduct.name}(s)`);
  console.log(`Price with 10% discount: $${discountPrice}`);
  console.log(`Remaining stock: ${laptopProduct.stock}`);
} else {
  console.log("Not enough stock available");
}

// Example 2: User Authentication System
console.log("\nExample 2: User Authentication System");

// User class using ES6 syntax
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
    this._passwordHash = null; // "_" convention indicates "private" (though not truly private)
    this.isLoggedIn = false;
    this.lastLogin = null;
  }
  
  // Method to set password (with simple hashing)
  setPassword(password) {
    // In a real system, use proper password hashing
    this._passwordHash = `hashed_${password.split('').reverse().join('')}`;
  }
  
  // Authenticate method
  authenticate(password) {
    const attemptHash = `hashed_${password.split('').reverse().join('')}`;
    
    if (attemptHash === this._passwordHash) {
      this.isLoggedIn = true;
      this.lastLogin = new Date();
      return true;
    }
    return false;
  }
  
  // Log out method
  logout() {
    this.isLoggedIn = false;
    return "Logged out successfully";
  }
  
  // Get profile info
  getProfileInfo() {
    return {
      username: this.username,
      email: this.email,
      loginStatus: this.isLoggedIn ? "Online" : "Offline",
      lastLogin: this.lastLogin
    };
  }
}

// Create a user and simulate authentication flow
const alice = new User("alice_smith", "alice@example.com");
alice.setPassword("securePassword123");

console.log("Attempting login with wrong password...");
const wrongLoginResult = alice.authenticate("wrongPassword");
console.log(`Login successful? ${wrongLoginResult}`);
console.log(alice.getProfileInfo());

console.log("\nAttempting login with correct password...");
const correctLoginResult = alice.authenticate("securePassword123");
console.log(`Login successful? ${correctLoginResult}`);
console.log(alice.getProfileInfo());

console.log("\nLogging out...");
console.log(alice.logout());
console.log(alice.getProfileInfo());

// Example 3: Event System (Publisher-Subscriber Pattern)
console.log("\nExample 3: Event System");

// Event system class
class EventEmitter {
  constructor() {
    // Store event listeners
    this.events = {};
  }
  
  // Subscribe to an event
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    return () => this.off(eventName, listener); // Return unsubscribe function
  }
  
  // Unsubscribe from an event
  off(eventName, listener) {
    if (!this.events[eventName]) return;
    
    this.events[eventName] = this.events[eventName].filter(
      existingListener => existingListener !== listener
    );
  }
  
  // Emit an event (notify subscribers)
  emit(eventName, ...args) {
    if (!this.events[eventName]) return;
    
    this.events[eventName].forEach(listener => {
      listener(...args);
    });
  }
  
  // Emit an event only once
  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    
    return this.on(eventName, onceWrapper);
  }
}

// Create an event emitter for a chat application
const chatEvents = new EventEmitter();

// Event listeners
function messageListener(username, message) {
  console.log(`${username}: ${message}`);
}

function userJoinedListener(username) {
  console.log(`${username} has joined the chat`);
}

function userLeftListener(username) {
  console.log(`${username} has left the chat`);
}

// Subscribe to events
chatEvents.on("message", messageListener);
chatEvents.on("userJoined", userJoinedListener);
chatEvents.on("userLeft", userLeftListener);


// Only receive the next error message
chatEvents.once("error", errorMsg => {
  console.log(`ERROR: ${errorMsg}`);
});

// Simulate chat activity
console.log("Chat Room Activity:");
chatEvents.emit("userJoined", "Bob");
chatEvents.emit("message", "Bob", "Hello everyone!");
chatEvents.emit("userJoined", "Alice");
chatEvents.emit("message", "Alice", "Hi Bob!");
chatEvents.emit("error", "Connection interrupted");
chatEvents.emit("error", "This error won't be shown");
chatEvents.emit("userLeft", "Bob");

// ===== PART 4: PERFORMANCE AND SCALABILITY BENEFITS =====
console.log("\n===== PART 4: PERFORMANCE AND SCALABILITY BENEFITS =====");

// Reusability via prototypes
console.log("\nReusability via Prototypes");

// Instead of creating separate copies of methods for each object instance,
// add methods to the prototype to save memory

function Vehicle(make, model) {
  this.make = make;
  this.model = model;
}

// Methods shared by all instances (memory efficient)
Vehicle.prototype.getDescription = function() {
  return `${this.make} ${this.model}`;
};

Vehicle.prototype.start = function() {
  return `The ${this.make} ${this.model} engine is starting...`;
};

// Create many instances without duplicating methods
const car1 = new Vehicle("Toyota", "Camry");
const car2 = new Vehicle("Honda", "Accord");
const car3 = new Vehicle("Ford", "Mustang");
// ... imagine thousands more

console.log(car1.getDescription());
console.log(car2.start());

// Memory efficiency example
console.log("\nMemory Efficiency Example");
console.log("Do all vehicles share the same method?");
console.log(`car1.start === car2.start: ${car1.start === car2.start}`); // true means only one copy!

// Demonstrate inheritance and polymorphism
console.log("\nInheritance and Polymorphism");

// Base class
class Shape {
  constructor() {
    this.type = "Shape";
  }
  
  area() {
    return 0;
  }
  
  describe() {
    return `This is a ${this.type} with area: ${this.area()}`;
  }
}

// Derived classes
class Circle extends Shape {
  constructor(radius) {
    super();
    this.type = "Circle";
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.type = "Rectangle";
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}

// Different objects can be treated uniformly (polymorphism)
const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Circle(3)
];

// Process all shapes the same way regardless of specific type
shapes.forEach(shape => {
  console.log(shape.describe());
});

// Composition example (more flexible than inheritance)
console.log("\nComposition Example");

// Component functions
const hasPosition = (x, y) => ({
  position: { x, y },
  move(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
    return this.position;
  }
});

const hasHealth = (initialHealth) => ({
  health: initialHealth,
  maxHealth: initialHealth,
  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    return this.health;
  },
  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
    return this.health;
  }
});

const canAttack = (damage) => ({
  attackDamage: damage,
  attack(target) {
    return target.takeDamage(this.attackDamage);
  }
});

// Create game entities through composition
function createPlayer(name, x, y) {
  return {
    name,
    type: "Player",
    ...hasPosition(x, y),
    ...hasHealth(100),
    ...canAttack(15),
    // Player-specific properties
    experience: 0,
    level: 1,
    gainExperience(amount) {
      this.experience += amount;
      if (this.experience >= 100) {
        this.level++;
        this.experience -= 100;
        this.maxHealth += 20;
        this.health = this.maxHealth;
        this.attackDamage += 5;
        return `${this.name} leveled up to level ${this.level}!`;
      }
      return `${this.name} gained ${amount} experience.`;
    }
  };
}

function createMonster(name, x, y, health, damage) {
  return {
    name,
    type: "Monster",
    ...hasPosition(x, y),
    ...hasHealth(health),
    ...canAttack(damage)
  };
}

// Create game entities
const player = createPlayer("Hero", 0, 0);
const goblin = createMonster("Goblin", 10, 5, 30, 5);

// Interaction between objects
console.log(`${player.name} at position ${JSON.stringify(player.position)}`);
console.log(`${player.name} moves to ${JSON.stringify(player.move(10, 5))}`);
console.log(`${player.name} attacks ${goblin.name}`);
console.log(`${goblin.name}'s health reduced to ${player.attack(goblin)}`);
console.log(player.gainExperience(30));

// ===== CONCLUSION =====
console.log("\n===== CONCLUSION =====");
console.log(`
Objects provide critical advantages that primitive types cannot:
1. Group related data (organization)
2. Combine data with behavior (methods)
3. Enable encapsulation (data hiding)
4. Support inheritance (code reuse)
5. Allow polymorphism (flexibility)
6. Enable composition (modular design)
7. Improve memory efficiency (shared methods via prototypes)
8. Model real-world entities and processes naturally

These capabilities are essential for building maintainable, scalable applications.
`);
