const { pipelineTopicExpression } = require("@babel/types");

console.log("Welcome to Scripting");

let topic = "JavaScript";
let start = "today";
let end = "NA";
let participants = ["carlos", "carlos1", "carlos 2"];


const dashboard = {
    topic: topic,
    start: start,
    end: end,
    participants: participants
};

console.log(dashboard.topic);
console.log(dashboard['start']);
console.log(dashboard.participants);

function DashBoard(topic){
    // this.start = start;
    this.topic = topic;
    this.SayHello = function(){
        console.log("Hello World " + this.topic)
    }
}

function SayHello(){
    console.log("Hello World");
}

let dashboard1 = new DashBoard("Java");
let dashboard2 = new DashBoard("Python");
let dashboard3 = new DashBoard("NA");

// jsdashboard.start

// SayHello();

dashboard1.SayHello();
dashboard2.SayHello();
dashboard3.SayHello();

console.log(dashboard1.topic);

const number = 10;

console.log(number.toLocaleString());