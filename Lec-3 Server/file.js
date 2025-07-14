const fs = require("fs");


// File Write, Read and Append

// txt => Hello FS Module


// Write File

// Sync
// fs.writeFileSync(fileName, message/statement);
// fs.writeFileSync("test.txt", "Hello Node JS");

// Async
//fs.writeFile(fileName, message/statement, callBack);
// fs.writeFile("demo.txt", "Hello Async Programming", (err) => { });


// Read File

// const result = fs.readFileSync("test.txt", "utf-8");

// console.log(result);

// fs.readFile("demo.txt", "utf-8", (err, result) => {
//     console.log(result);
// })

// Append File

// fs.appendFileSync("test.txt", "\nI am Full Stack Developer hu 😎")

fs.unlink("demo.txt", (err) => { });

fs.copyFile("test.txt", "hello.txt", (err) => { })