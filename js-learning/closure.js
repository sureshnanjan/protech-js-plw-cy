function createCounter(from) {
   
    let count = from;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter(0);
const counterfrom100 = createCounter(100);
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counterfrom100());
console.log(counterfrom100());
console.log(counterfrom100());
console.log(counterfrom100());
console.log(counterfrom100());
console.log(counterfrom100());