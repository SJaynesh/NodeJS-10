const express = require("express");

const route = express.Router();

const { addStud, fetchStud } = require("../controllers/studentsController");
const uploads = require("../middleware/studentMulter");

// Insert Student
route.post("/addStud", uploads.single("image"), addStud);

// Fetch Students
route.get("/fetchStud", fetchStud);

module.exports = route;
