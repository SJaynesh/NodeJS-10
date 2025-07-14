const express = require("express");

const route = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/blog.middleware");
const { addBlog, fetchBlogs, currentUserBlogs, deleteBlog, editBlog } = require("../controllers/blog.controller");

// Add Blog
route.post("/add", auth, upload.single("image"), addBlog);

// Fetch All Blogs 
route.get("/blogs", auth, fetchBlogs);

// Fetch Currebnt User Blogs 
route.get("/current_blogs", auth, currentUserBlogs);

// Delete Blog
route.delete("/delete", auth, deleteBlog);

// Update Blog
route.patch("/edit", auth, upload.single("image"), editBlog);

module.exports = route;
