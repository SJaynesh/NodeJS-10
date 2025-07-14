const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    title: String,
    content: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", blogSchema, "Blogs");
