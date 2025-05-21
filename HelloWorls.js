const e = require("express");

console.log("Welcome to Scripting");

// Name
// Age
// Professhon
// Dash board Topic , Start , End , Participants 

let topic = "JavaScript";
let start = "2023-10-01";
let end = "2023-10-31"; 
let participants = ["suresh", "ramesh", "mahesh", "suresh", "ramesh", "mahesh", "suresh", "ramesh", "mahesh", "suresh", "ramesh", "mahesh"];


function DashBoard(topic) {
//this.start = start;     
    this.topic = topic;
    this.sayHello = function() {
        console.log("Hello World" + this.topic);
    }
}

const sayHello = () => console.log("Hello World" ); // Arrow function
// Function Declaration
function Simple(name){
    this.name = name;
    
}

Simple.prototype.sayHello = function() {
    console.log("Hello " + this.name);
    //return this.name;
}

const simple = new Simple("Suresh");
const simple1 = new Simple("Ramesh");
simple.sayHello();
simple1.sayHello();
console.log(simple.sayHello === simple1.sayHello);

const coll = []; // {}
coll.push(simple);

function executeSomething(callback) {
    console.log("Executing something");
    callback();
}


const greetEnglish = () => {
    console.log("Hello");
}

const greetSpanish = () => {
    console.log("Hola");
}

function sayHelloTamil() {
    console.log("Vanakkam");
}   

executeSomething(greetEnglish);
executeSomething(greetSpanish);
executeSomething(() => {
    console.log("Hello World");
});
executeSomething(sayHelloTamil);









