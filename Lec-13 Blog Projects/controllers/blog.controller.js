const blog = require("../models/blog.model");

exports.addBlog = async (req, res) => {
  try {
    const newBlog = await blog.create({
      userId: req.user._id,
      title: req.body.title,
      content: req.body.content,
      image: req.file.path,
    });

    newBlog
      ? res
          .status(201)
          .json({ status: true, success: "Blog is inserted successfully.." })
      : res
          .status(201)
          .json({ status: true, success: "Blog is insertion failed.." });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
};
