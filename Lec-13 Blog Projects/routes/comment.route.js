const express = require("express");

const route = express.Router();

const auth = require("../middleware/auth.middleware");
const { addComment, fetchComment } = require("../controllers/comment.controller");

route.post("/add", auth, addComment);

route.post("/fetch", auth, fetchComment);

module.exports = route;
