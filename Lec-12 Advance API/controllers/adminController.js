const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const adminRegister = async (req, res) => {
  try {
    if (!(await adminModel.findOne({ username: req.body.username }))) {
      if (!(await adminModel.findOne({ email: req.body.email }))) {
        console.log("Perfect Email");
        req.body.image = req.file.path;

        req.body.password = await bcrypt.hash(req.body.password, 11);

        req.body.created_date = moment().format("DD/MM/YYYY, h:mm:ss A");
        req.body.updated_date = moment().format("DD/MM/YYYY, h:mm:ss A");
        req.body.status = true;

        const insertAdmin = await adminModel.create(req.body);
        if (insertAdmin) {
          console.log("Perfect Admin Created");
          res
            .status(201)
            .json({ register: true, msg: "Admin Register succussfully..." });
        } else {
          console.log("Not Perfect Admin Created");
          res
            .status(201)
            .json({ register: false, msg: "Admin Registion failed..." });
        }
      } else {
        res.status(201).json({ register: false, msg: "Email is exits..." });
      }
    } else {
      res.status(201).json({ register: false, msg: "Username is exits..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

const adminLogin = async (req, res) => {
  try {
    const adminUserNameData = await adminModel.findOne({
      username: req.body.email,
    });

    if (adminUserNameData) {
      if (await bcrypt.compare(req.body.password, adminUserNameData.password)) {
        const token = jwt.sign(
          { adminData: adminUserNameData },
          "Admin@JWT#123"
        );

        res
          .status(201)
          .json({ login: true, msg: "Login Successfully...", token: token });
      } else {
        res.status(201).json({ login: false, msg: "Password is not match.." });
      }
    } else {
      const adminEmailData = await adminModel.findOne({
        email: req.body.email,
      });

      if (adminEmailData) {
        if (await bcrypt.compare(req.body.password, adminEmailData.password)) {
          const token = jwt.sign(
            { adminData: adminEmailData },
            "Admin@JWT#123"
          );
          res
            .status(201)
            .json({ login: true, msg: "Login Successfully...", token: token });
        } else {
          res
            .status(201)
            .json({ login: false, msg: "Password is not match.." });
        }
      } else {
        res
          .status(201)
          .json({ login: false, msg: "Username or Email not found..." });
      }
    }
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

const adminProfile = async (req, res) => {
  try {
    res.status(200).json({ msg: "Profile Data...", profile: req.user });
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  adminProfile,
};
