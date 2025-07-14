const comment = require("../models/comment.model");


exports.addComment = async (req, res) => {
    try {
        console.log(req.body);

        const blogComment = await comment.create({
            "userId": req.user._id,
            "blogId": req.body.blogId,
            "comment": req.body.comment,
        });

        blogComment
            ? res
                .status(201)
                .json({ status: true, success: "Comment is inserted successfully.." })
            : res
                .status(201)
                .json({ status: true, success: "Comment is insertion failed.." });
    } catch (e) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: e,
        });
    }
}

exports.fetchComment = async (req, res) => {
    try {
        console.log(req.body);

        const allComment = await comment.find({ blogId: req.body.blogId }).populate('userId').populate('blogId');

        (allComment)
            ? res.status(200).json({ status: true, success: "Comment are fetched...", blogs: allComment })
            : res.status(401).json({ status: false, error: "Comment not found..." });
    } catch (e) {
        res.status(400).json({
            status: false,
            error: "Something went wrong...",
            error_data: e,
        });
    }
}