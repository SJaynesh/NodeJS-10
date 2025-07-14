const express = require("express");

console.log("Admin Routing...");

const route = express.Router();

const upload = require("../middleware/adminMulter");
const adminAuth = require("../middleware/adminAuth");
const {
  adminRegister,
  adminLogin,
  adminProfile,
  adminChangePassword,
  adminForgetPassword,
  fetchAdmin,
  deleteAdmin,
  updateStatus,
} = require("../controllers/adminController");

// Admin Register
route.post("/register", upload.single("image"), adminRegister);
// Admin Login
route.post("/login", adminLogin);
// Admin Profile
route.get("/profile", adminAuth, adminProfile);
// Admin Change Password
route.post("/changePassword", adminAuth, adminChangePassword);
// Forget Password
route.post("/forgetPassword", adminForgetPassword);

// Fetch All Admin
route.get("/fetchAdmin", adminAuth, fetchAdmin);

// Delete Admin
route.delete("/deleteAdmin", adminAuth, deleteAdmin);

// Update Status
route.patch("/updateStatus", adminAuth, updateStatus);

module.exports = route;
