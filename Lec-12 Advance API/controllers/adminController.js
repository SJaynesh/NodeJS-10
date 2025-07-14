const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");

const adminRegister = async (req, res) => {
  try {
    if (await adminModel.findOne({ username: req.body.username }))
      res.status(201).json({ register: false, msg: "Username is exits..." });

    if (await adminModel.findOne({ email: req.body.email }))
      res.status(201).json({ register: false, msg: "Email is exits..." });

    req.body.image = req.file.path;

    req.body.password = await bcrypt.hash(req.body.password, 11);

    req.body.created_date = moment().format("DD/MM/YYYY, h:mm:ss A");
    req.body.updated_date = moment().format("DD/MM/YYYY, h:mm:ss A");
    req.body.status = true;

    const insertAdmin = await adminModel.create(req.body);
    insertAdmin
      ? res
          .status(201)
          .json({ register: true, msg: "Admin Register succussfully..." })
      : res
          .status(201)
          .json({ register: false, msg: "Admin Registion failed..." });
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
          "Admin@JWT#123",
          { expiresIn: "1d" }
        );

        res
          .status(201)
          .json({ login: true, msg: "Login Successfully...", token: token });
      } else
        res.status(201).json({ login: false, msg: "Password is not match.." });
    } else {
      const adminEmailData = await adminModel.findOne({
        email: req.body.email,
      });

      if (adminEmailData) {
        if (await bcrypt.compare(req.body.password, adminEmailData.password)) {
          const token = jwt.sign(
            { adminData: adminEmailData },
            "Admin@JWT#123",
            { expiresIn: "1d" }
          );
          res
            .status(201)
            .json({ login: true, msg: "Login Successfully...", token: token });
        } else
          res
            .status(201)
            .json({ login: false, msg: "Password is not match.." });
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

const adminChangePassword = async (req, res) => {
  try {
    if (!(await bcrypt.compare(req.body.current_password, req.user.password)))
      return res.status(201).json({
        changepassword: false,
        msg: "current password is not match...",
      });

    if (req.body.current_password == req.body.new_password)
      return res.status(201).json({
        changepassword: false,
        msg: "current password and new password both are equal...",
      });

    if (req.body.new_password != req.body.conform_password)
      return res.status(201).json({
        changepassword: false,
        msg: "new password and confoem password both are not equal...",
      });

    req.body.new_password = await bcrypt.hash(req.body.new_password, 10);

    const updatePassword = await adminModel.findByIdAndUpdate(req.user._id, {
      password: req.body.new_password,
    });

    return updatePassword
      ? res
          .status(201)
          .json({ changepassword: true, msg: "Password is changed...." })
      : res
          .status(201)
          .json({ changepassword: false, msg: "Password is not changed...." });
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

const adminForgetPassword = async (req, res) => {
  try {
    const adminData = await adminModel.findOne({ email: req.body.email });

    if (!adminData)
      res.status(201).json({ forget: false, msg: "Email is invalid..." });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rw5.jaynesh.pc@gmail.com",
        pass: "qqrbiqsoleiuenkk",
      },
    });

    const OTP = Math.floor(Math.random() * 1000000);

    console.log(OTP);

    const mail = {
      from: '"Sarkar Infotech" <rw5.jaynesh.pc@gmail.com>',
      to: req.body.email,
      subject: "Forget Password",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f3f5;
              padding: 0;
              margin: 0;
            }
            .email-container {
              max-width: 500px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background-color: #004aad;
              padding: 20px;
              color: #fff;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 30px 25px;
              color: #333;
              font-size: 16px;
              line-height: 1.6;
            }
            .otp-box {
              margin: 20px 0;
              padding: 15px;
              background-color: #f0f4ff;
              border: 2px dashed #004aad;
              border-radius: 8px;
              text-align: center;
              font-size: 24px;
              letter-spacing: 5px;
              font-weight: bold;
              color: #004aad;
            }
            .footer {
              padding: 15px;
              text-align: center;
              font-size: 12px;
              color: #888;
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Sarkar Infotech</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You requested to reset your password. Please use the following OTP to proceed:</p>
              <div class="otp-box">${OTP}</div>
              <p>This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
              <p>If you did not request this, please ignore this email or contact our support.</p>
              <p>Thanks,<br />Sarkar Infotech Team</p>
            </div>
            <div class="footer">
              &copy; 2025 Sarkar Infotech. All rights reserved.
            </div>
          </div>
        </body>
      </html>
`, // HTML body
    };

    const info = await transporter.sendMail(mail);

    if (info.messageId) {
      res
        .status(201)
        .json({ forget: true, msg: "OTP Send Successfully...", OTP: OTP });
    } else {
      res.status(201).json({ forget: false, msg: "OTP Failed..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

const fetchAdmin = async (req, res) => {
  try {
    const allAdmin = await adminModel.find({});

    allAdmin
      ? res
          .status(200)
          .json({ status: true, msg: "All admin fetch...", allAdmin: allAdmin })
      : res.status(200).json({
          status: false,
          msg: "Admin not fetched...",
          allAdmin: allAdmin,
        });
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

const updateAdmin = async (req, res) => {};

const updateStatus = async (req, res) => {
  console.log(req.body);
  try {
    const adminData = await adminModel.findById(req.body.id);

    if (!adminData) {
      res.status(200).json({ status: false, msg: "Admin not found...." });
    }

    console.log("Status : ", adminData.status);

    adminData.status = !adminData.status; // status = !true
    const updated_date = moment().format("DD/MM/YYYY, h:mm:ss A");

    console.log("Updated Date : ", updated_date);

    const updateStatus = await adminModel.findByIdAndUpdate(req.body.id, {
      status: adminData.status,
      updated_date: updated_date,
    });

    updateStatus
      ? res
          .status(200)
          .json({ status: true, msg: "Admin Status is changed..." })
      : res
          .status(200)
          .json({ status: false, msg: "Admin Status is not changed..." });
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

const deleteAdmin = async (req, res) => {
  console.log(req.body); // {name : "Keval", age : "20"}

  try {
    const adminData = await adminModel.findById(req.body.id);

    if (!adminData) {
      res.status(200).json({ status: false, msg: "Admin not found...." });
    }

    fs.unlinkSync(adminData.image);

    const deleteAdmin = await adminModel.findByIdAndDelete(req.body.id);

    deleteAdmin
      ? res
          .status(200)
          .json({ status: true, msg: "Admin Deleted Successfully..." })
      : res
          .status(200)
          .json({ status: false, msg: "Admin Deletion Failed..." });
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  adminProfile,
  adminChangePassword,
  adminForgetPassword,
  fetchAdmin,
  deleteAdmin,
  updateAdmin,
  updateStatus,
};
