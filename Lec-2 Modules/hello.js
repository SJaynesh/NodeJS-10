const math = require("./math");

console.log("Hey There !! I am JS");

/*

    Modules :

    Three Types of Modules:

    1. Built-In Modules / Core Modules
        http, fs,  url, etc..

    2. Custome Modules / Local Modules
        
    3. Third-Party Modules
        npm i express
*/

// console.log("Math Value of", math.addFun(10, 50));
// console.log("Math Value of", math.subFun(10, 50)); 

console.log("Math Module", math.addFun(10, 20));
console.log("Math Module", math.subFun(10, 20));
