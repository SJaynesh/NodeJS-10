const express = require("express");

console.log("Manager Routing...");

const route = express.Router();

const upload = require("../middleware/managerMulter");
const adminAuth = require("../middleware/adminAuth");
const {
  managerRegister,
  fetchManagers,
} = require("../controllers/managerController");

route.post("/register", adminAuth, upload.single("image"), managerRegister);

route.get("/fetchManager", adminAuth, fetchManagers);

module.exports = route;
