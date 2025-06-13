const usersModel = require("../models/usersModel");

// Fetch All Users
const fetchUser = async (req, res) => {
  try {
    const usersData = await usersModel.find({});

    if (usersData) {
      res
        .status(200)
        .json({ msg: "Users records found...", records: usersData });
    } else {
      res.status(200).json({ msg: "Users records not found..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Wrong", err: e });
  }
};

// Insert User
const insertUser = async (req, res) => {
  console.log(req.body);

  try {
    const addUser = await usersModel.create(req.body);

    if (addUser) {
      res
        .status(201)
        .json({ insert: true, msg: "User Inserted Successfully...." });
    } else {
      res.status(200).json({ insert: false, msg: "User Insertion Failed...." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Wrong", err: e });
  }
};

// Update User

const updateUser = async (req, res) => {
  try {
    const updateData = await usersModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (updateData) {
      res.status(200).json({ update: true, msg: "User Record updated...." });
    } else {
      res
        .status(200)
        .json({ update: false, msg: "User Record updation failed...." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Wrong", err: e });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedData = await usersModel.findByIdAndDelete(req.params.id);

    if (deletedData) {
      res.status(200).json({ delete: true, msg: "User Record deleted..." });
    } else {
      res
        .status(200)
        .json({ delete: false, msg: "User Record deletion failed..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Wrong", err: e });
  }
};

module.exports = {
  fetchUser,
  insertUser,
  deleteUser,
  updateUser,
};
