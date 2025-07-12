const blog = require("../models/blog.model");
const fs = require("fs");

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

exports.fetchBlogs = async (req, res) => {
  try {
    const allBlogs = await blog.find({}).populate('userId');

    (allBlogs)
      ? res.status(200).json({ status: true, success: "Blogs are fetched...", blogs: allBlogs })
      : res.status(401).json({ status: false, success: "Blogs not found..." });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
}

exports.currentUserBlogs = async (req, res) => {
  try {
    const allBlogs = await blog.find({ 'userId': req.user._id });

    (allBlogs)
      ? res.status(200).json({ status: true, success: "Blogs are fetched...", blogs: allBlogs })
      : res.status(401).json({ status: false, success: "Blogs not found..." });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
}

exports.deleteBlog = async (req, res) => {
  try {

    const deletedBlog = await blog.findByIdAndDelete(req.body.id);

    console.log(deletedBlog);

    if (deletedBlog) {

      fs.unlinkSync(deletedBlog.image)

      res.status(200).json({
        status: true,
        success: "Blog deleted...",
      });

    } else {
      res.status(401).json({
        status: false,
        error: "Blog not found...",
      });
    }


  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
}

exports.editBlog = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }

    const updatedBlog = await blog.findByIdAndUpdate(req.body.id, req.body);

    if (req.file && updatedBlog) {
      fs.unlinkSync(updatedBlog.image);
    }

    (updatedBlog)
      ? res.status(200).json({ status: true, success: "Blog updated..." })
      : res.status(200).json({ status: false, error: "Blog updation failed..." });

  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
}