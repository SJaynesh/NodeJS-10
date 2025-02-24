const http = require("http");

const myServer = http.createServer((req, res) => {
    console.log("New Request and Response");
    // res.write("Hello My Server !!");

    const page = req.url;
    console.log("URL", req.url);

    switch (page) {
        case '/':
            res.write("<h1>Home Page</h1>");
            res.end();
            break;
        case '/about':
            res.write("<h1> About Page</h1>");
            res.end();
            break;
        case '/contact':
            res.write("<h1> Contact Page</h1>");
            res.end();
            break;
        default:
            res.write("<h1> 404 Not Found !! </h1>")
            res.end();
    }

    // res.end("<h1>Hello Server</h1>");
});

myServer.listen(9000, () => console.log("Server Started !!"));