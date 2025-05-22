var globalVar = "I'm global";

function outerFunction() {
    var outerVar = "I'm outer";
    
    function innerFunction() {
        var innerVar = "I'm inner";
        console.log(globalVar); // Accessible
        console.log(outerVar);  // Accessible
        console.log(innerVar);  // Accessible
    }
    
    innerFunction();
    console.log(globalVar); // Accessible
    console.log(outerVar);  // Accessible   
    //console.log(innerVar); // Error: innerVar is not defined
}

console.log(globalVar); // Accessible
//console.log(outerVar);  // Accessible   
//console.log(innerVar); // Error: innerVar is not defined
outerFunction();

