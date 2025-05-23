// function myFunction() {
//     var localVar = "I'm local";
//     console.log(localVar); // Works fine
// }

// myFunction();
// console.log(localVar); // Error: localVar is not defined

const myPromise = new Promise((correct, incorrect) => {
    const dowload = false
    if (dowload) {
        correct({filename: "file.txt", size: "2MB"});
    } else {
        incorrect({error: "File not found"});
    }
});
 
myPromise.then((result) => {
    console.log("Promise resolved:", result);
})
.catch((error) => {
    console.error("Promise rejected:", error);
});