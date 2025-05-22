function myFunction() {
    var localVar = "I'm local";
    console.log(localVar); // Works fine
}

myFunction();
console.log(localVar); // Error: localVar is not defined