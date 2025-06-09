const express = require("express");

const route = express.Router();

console.log("Routing...");

const { fetchUser, insertUser } = require("../controllers/usersController");

route.get("/users", fetchUser);
route.post("/users", insertUser)

module.exports = route;
