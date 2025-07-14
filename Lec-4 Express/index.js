const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
    fs.readFile("index.html", (err, result) => {
        res.end(result);
    })
})

app.get("/about", (req, res) => {
    fs.readFile("about.html", (err, result) => {
        res.end(result);
    })
})

const port = 8000;

app.listen(port, () => console.log("Server Start !!"))
