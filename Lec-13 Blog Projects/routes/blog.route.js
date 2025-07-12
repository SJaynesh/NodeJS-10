const express = require("express");

const route = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/blog.middleware");
const { addBlog } = require("../controllers/blog.controller");

route.post("/add", auth, upload.single("image"), addBlog);

module.exports = route;
