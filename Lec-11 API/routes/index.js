const express = require("express");

const route = express.Router();

console.log("Routing...");

route.use("/students", require("./studentRoute"));

route.use("/user", require("./userRoute"));

module.exports = route;
