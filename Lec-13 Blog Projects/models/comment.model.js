const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        blogId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blogs",
        },
        comment: String
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comments", commentSchema, "Comments");
