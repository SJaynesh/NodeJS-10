const studentsModel = require("../models/studentsModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const fs = require("fs");

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

// Fetch Single Student
const fetchSingleStud = async (req, res) => {
  try {
    const singleStud = await studentsModel.findById(req.params.id);
    if (singleStud) {
      res.status(200).json(singleStud);
    } else {
      res.status(200).json({ msg: "Student not found.." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong...", error: e });
  }
};

// Update Student
const updateStud = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    req.body.updated_date = moment().format("DD/MM/YYYY, h:mm:ss A");

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file) {
      const data = await studentsModel.findById(req.params.id);

      if (data) {
        fs.unlinkSync(data.image);
        req.body.image = req.file.path;
      }
    }

    const updatedData = await studentsModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (updatedData) {
      res
        .status(200)
        .json({ update: true, msg: "Student updated successfully..." });
    } else {
      res
        .status(200)
        .json({ update: false, msg: "Student updation failed..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong...", error: e });
  }
};

// Delete Student
const delStud = async (req, res) => {
  try {
    const deletedData = await studentsModel.findByIdAndDelete(req.params.id);

    if (deletedData) {
      fs.unlinkSync(deletedData.image);
      res
        .status(200)
        .json({ delete: true, msg: "Student data deleted successfully..." });
    } else {
      res
        .status(200)
        .json({ delete: false, msg: "Student data deletion failed..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something Went Wrong...", error: e });
  }
};

module.exports = {
  addStud,
  fetchStud,
  fetchSingleStud,
  updateStud,
  delStud,
};
