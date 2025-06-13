const studentsModel = require("../models/studentsModel");
const bcrypt = require("bcrypt");
const moment = require("moment");

// Insert New Student
const addStud = async (req, res) => {
  try {
    // bcrypt.hash(password, salt)
    req.body.password = await bcrypt.hash(req.body.password, 11);
    // Date
    req.body.created_date = moment().format("DD/MM/YYYY, h:mm:ss A");
    req.body.updated_date = moment().format("DD/MM/YYYY, h:mm:ss A");

    req.body.image = req.file.path;

    const insertData = await studentsModel.create(req.body);
    if (insertData) {
      res
        .status(201)
        .json({ insert: true, msg: "Student inserted succussfully..." });
    } else {
      res
        .status(200)
        .json({ insert: false, msg: "Student insertion failed..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong...", error: e });
  }
};

// Fetch All Students
const fetchStud = async (req, res) => {
  try {
    // const studData = await studentsModel.find(
    //   {},
    //   { f_name: 1, l_name: 1, email: 1, _id: 0 }
    // );
    const studData = await studentsModel.find({});
    if (studData) {
      res
        .status(200)
        .json({ msg: "Students data found...", records: studData });
    } else {
      res.status(200).json({ msg: "Students data not found..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong...", error: e });
  }
};

module.exports = {
  addStud,
  fetchStud,
};
