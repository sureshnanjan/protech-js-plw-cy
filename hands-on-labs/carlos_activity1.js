// TODO: Declare variables for the following test data:
// - Test name: "Login Functionality Test"
// - Number of test cases: 5
// - Test is automated: true
// console.log("\n===== PART 5: ADVANCED PROTOTYPE TECHNIQUES =====");
console.log("=====TODO: Declare variables for the following test data:=====");
console.log(">Test name: \"Login Functionality Test\"");
console.log(">Number of test cases: 5");
console.log(">Test is automated: true \n");

var testName = "Login Functionality Test";
const numTestCases = 5;

const test_name = {
    "Test name": "Login Functionality Test",
    "Number of test cases": 5,
    "Test is automated": true,
    test_info() {
        console.log(`Test case name is: ${this["Test name"]}`);
        console.log(`This is the number of test cases: ${this["Number of test cases"]}`);
        console.log(`Test is automated?: ${this["Test is automated"]}`);
    }
};
console.log(test_name);
test_name.test_info();
console.log(typeof(testName));
console.log(typeof(test_name));
// { key : value }