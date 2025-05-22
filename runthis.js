
const mynumbers = [1, 2, 3, 4, 5];
mynumbers.forEach((number) => {
    console.log(number)
});

mynumbers.forEach((number) => {
    number = number * 2
    console.log(number)
});

const doubled = mynumbers.map((number) => number * 2); 
const tripled = mynumbers.map((number) => number * 3); 

console.log(doubled);
console.log(mynumbers);
console.log(tripled);







