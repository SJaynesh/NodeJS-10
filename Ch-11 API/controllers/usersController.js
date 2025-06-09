const usersModel = require("../models/usersModel");

const fetchUser = (req, res) => {
  res.status(200).json({ msg: "GET Request is called..." });
};

const insertUser = async (req, res) => {
  console.log(req.body);

  try {
    const addUser = await usersModel.create(req.body);

    if (addUser) {
      res
        .status(201)
        .json({ insert: true, msg: "User Inserted Successfully...." });
    } else {
      res.status(400).json({ insert: false, msg: "User Insertion Failed...." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Wrong", err: e });
  }
};

module.exports = {
  fetchUser,
  insertUser,
};
