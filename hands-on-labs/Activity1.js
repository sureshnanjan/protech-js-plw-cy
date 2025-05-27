// TODO: Declare variables for the following test data:
// - Test name: "Login Functionality Test"
// - Number of test cases: 5
// - Test is automated: true
let testName = "Login Functionality Test";
let numTestCases = 5;
let isAutomated = true;

// TODO: Create a testConfig object with the following properties:
// - browser: "Chrome"
// - viewport: { width: 1280, height: 720 }
// - timeout: 30000 (30 seconds)
let testConfig = {
    browser: "chrome",
    viewport: {width: 1280, height: 720 },
    timeout: 30000
}

// TODO: Access and log the browser property from the testConfig
console.log("Browser:", testConfig.browser);


// TODO: Update the timeout to 60000 (60 seconds)
testConfig.timeout = 60000;

// TODO: Create a test summary string using template literals that includes:
// - Test name
// - Number of test cases
// - Whether the test is automated
// - Browser and viewport size
// Expected output format: "Running [testName] with [numTestCases] test cases. Automated: [isAutomated]. Config: [browser] at [viewport.width]x[viewport.height]"
let testSummary = `Running "${testName}" with ${numTestCases} test Cases.
Automated: ${isAutomated? "Yes" : "No"}
Browser: ${testConfig.browser}
viewport: ${testConfig.viewport.width}x${testConfig.viewport.height}
Timeout: ${testConfig.timeout /1000} seconds.`;
console.log("Test summary will be logged here:\n"+ testSummary);