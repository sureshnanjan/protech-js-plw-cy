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

// TODO: Create a testConfig object with the following properties:
// - browser: "Chrome"
// - viewport: { width: 1280, height: 720 }
// - timeout: 30000 (30 seconds)
console.log("\n=====TODO: Create a testConfig object with the following properties:=====");
console.log("- browser: \"Chrome\"");
console.log("- viewport: { width: 1280, height: 720 }");
console.log("- timeout: 30000 (30 seconds)\n");

const testConfig = {
    browser: "Chrome",
    viewport: {witdth: 1280, height: 720},
    timeout: 3000
}

console.log("The follow config in the object:");
console.log("Browser: ", testConfig.browser);
console.log("Viewport: ", testConfig.viewport);
console.log("Timeout: ", testConfig.timeout)

// TODO: Access and log the browser property from the testConfig
console.log("\n=====TODO: Access and log the browser property from the testConfig=====");
console.log("Here is: ", testConfig.browser);

// TODO: Update the timeout to 60000 (60 seconds)
console.log("\n=====TODO: Update the timeout to 60000 (60 seconds)=====");
console.log("Timeout before update: ", testConfig.timeout);
testConfig.timeout = 6000;
console.log("Timeout after update: ", testConfig.timeout);

// TODO: Create a test summary string using template literals that includes:
// - Test name
// - Number of test cases
// - Whether the test is automated
// - Browser and viewport size
// Expected output format: "Running [testName] with [numTestCases] test cases. Automated: [isAutomated]. Config: [browser] at [viewport.width]x[viewport.height]"
console.log("\n=====TODO: Create a test summary string using template literals that includes:=====");
console.log("- Test name");
console.log("- Number of test cases");
console.log("- Whether the test is automated");
console.log("- Browser and viewport size");
console.log("Expected output format: \"Running [testName] with [numTestCases] test cases. Automated: [isAutomated]. Config: [browser] at [viewport.width]x[viewport.height]\"\n");

console.log(`Expected output format: \"Running ${test_name["Test name"]} with ${test_name["Number of test cases"]} test cases. Automated: ${test_name["Test is automated"]}. Config: ${testConfig.browser} at [${testConfig.viewport.witdth}]X[${testConfig.viewport.height}]\"`);