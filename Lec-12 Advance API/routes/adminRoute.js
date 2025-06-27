const express = require("express");

console.log("Admin Routing...");

const route = express.Router();

const upload = require("../middleware/adminMulter");
const adminAuth = require("../middleware/adminAuth");
const {
  adminRegister,
  adminLogin,
  adminProfile,
} = require("../controllers/adminController");

route.post("/register", upload.single("image"), adminRegister);

route.post("/login", adminLogin);

route.get("/profile", adminAuth, adminProfile);

module.exports = route;
