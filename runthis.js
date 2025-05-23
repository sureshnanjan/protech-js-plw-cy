
const createPromise = new Promise((resolve, reject) => {
    const download = true; // Simulating a download condition
    if (download) {
        resolve({filename: "file.txt", size: "2MB"});
    } else {
        reject({error: "File not found"});
    }
});

const getResult = Promise.resolve({ name:"success"});
const getError = Promise.reject({ name:"error"});
async function doSomething() { 
 getError.catch((error) => {
    console.error("Promise rejected:", error); })
 
    

}

    








