const http = require("http");
const fs = require("fs");

const port = 9000;

function handler(req, res) {
    console.log("New Request and Response");
    // res.write("Hello My Server !!");

    const page = req.url;
    console.log("URL", req.url);

    let fileName = "";

    switch (page) {
        case '/':
            fileName = "home.html";
            break;
        case '/about':
            fileName = "about.html";
            break;
        // case '/contact':
        //     fileName = "contact.html";
        //     break;
        default:
            fileName = "error.html";
    }

    fs.readFile(fileName, (err, result) => {
        res.end(result);
    })

    // res.end("<h1>Hello Server</h1>");
}

const myServer = http.createServer(handler);

myServer.listen(port, () => console.log("Server Started !!"));