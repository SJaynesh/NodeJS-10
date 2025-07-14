const express = require("express");

const route = express.Router();

const {
  addStud,
  fetchStud,
  fetchSingleStud,
  updateStud,
  delStud,
} = require("../controllers/studentsController");

const uploads = require("../middleware/studentMulter");

// Insert Student
route.post("/addStud", uploads.single("image"), addStud);

// Fetch Students
route.get("/fetchStud", fetchStud);

// Fetch Single Students
route.get("/fetchSingleStud/:id", fetchSingleStud);

// Update Student
route.put("/updateStud/:id", uploads.single("image"), updateStud);

// Delete Student
route.delete("/deleteStud/:id", delStud);

module.exports = route;
