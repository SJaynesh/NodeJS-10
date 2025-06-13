const express = require("express");

const route = express.Router();

console.log("Routing...");

const {
  fetchUser,
  insertUser,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");

// Fetch All Users
route.get("/users", fetchUser);

// Add User
route.post("/users", insertUser);

// Update User
route.patch("/users/:id", updateUser);

// Delete User
route.delete("/users/:id", deleteUser);

route.use("/students", require("./studentRouter"));

module.exports = route;
