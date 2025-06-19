const express = require("express");

const route = express.Router();

console.log("Routing...");

const authUser = require("../middleware/authUser");

route.use("/students", authUser, require("./studentRoute"));

route.use("/user", require("./userRoute"));

module.exports = route;
