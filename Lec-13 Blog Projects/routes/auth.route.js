const express = require("express");

const route = express.Router();

const {
  register,
  login,
  users,
  deleteUser,
  updateUser,
} = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

route.post("/register", register);
route.post("/login", login);

// Fetch All Users
route.get("/users", auth, users);

// Delete User
route.delete("/delete", auth, deleteUser);

// Update User
route.patch("/update", auth, updateUser);

module.exports = route;
