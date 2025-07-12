const user = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    if (await user.findOne({ email: req.body.email }))
      res
        .status(401)
        .json({ status: false, error: "Email is allready exits..." });

    req.body.password = await bcrypt.hash(req.body.password, 11);

    (await user.create(req.body))
      ? res
          .status(201)
          .json({ status: true, success: "User Register Successfully.." })
      : res
          .status(401)
          .json({ status: false, error: "User Registion Failed.." });
  } catch (err) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const currentUser = await user.findOne({ email: req.body.email });

    if (!currentUser) {
      res.status(401).json({ status: false, error: "User not found..." });
    }

    if (await bcrypt.compare(req.body.password, currentUser.password)) {
      const token = jwt.sign(
        { current_user: currentUser },
        process.env.Secret,
        { expiresIn: "1h" }
      );

      res.status(201).json({
        status: true,
        success: "User Login Successfully...",
        user: currentUser,
        auth_token: token,
      });
    } else
      res.status(401).json({ status: false, error: "Password is wrong..." });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
};

exports.users = async (req, res) => {
  try {
    const allUsers = await user.find({});

    allUsers
      ? res.status(200).json({
          status: true,
          users: allUsers,
        })
      : res.status(200).json({
          status: false,
          users: allUsers,
          error: "Users not found....",
        });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.body.id);

    deletedUser
      ? res
          .status(200)
          .json({ status: true, success: "User Deleted..", user: deletedUser })
      : res.status(401).json({
          status: false,
          success: "User Deletion Failed..",
        });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateUser = await user.findByIdAndUpdate(req.body.id, req.body);

    updateUser
      ? res
          .status(200)
          .json({ status: true, success: "User updated successfully..." })
      : res
          .status(401)
          .json({ status: false, error: "User updation failed..." });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
};
