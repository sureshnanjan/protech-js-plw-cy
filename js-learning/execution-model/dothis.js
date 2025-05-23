const myPromise = new Promise((correct, incorrect) => {
    const dowload = false
    if (dowload) {
        correct({filename: "file.txt", size: "2MB"});
    } else {
        incorrect({error: "File not found"});
    }
    incorrect("2. Promise FAILED");
});

async function doSomething() {
    try {
        const result = await myPromise;
        console.log(" Promise resolved:", result);
    } catch (error) {
        console.error(" Promise rejected:");
    }
}