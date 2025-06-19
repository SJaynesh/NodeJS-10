const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "SJaynesh@1232#^";

// Register User
const registerUser = async (req, res) => {
  try {
    const exitsUserNameData = await user.findOne({
      username: req.body.username,
    });

    if (exitsUserNameData == null) {
      const exitsEmailData = await user.findOne({ email: req.body.email });

      if (exitsEmailData == null) {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const registerUserData = await user.create(req.body);

        if (registerUserData) {
          res
            .status(201)
            .json({ register: true, msg: "User Registed Successfully..." });
        } else {
          res
            .status(201)
            .json({ register: false, msg: "User Registion failed..." });
        }
      } else {
        res.status(201).json({ msg: "Email allready extits.." });
      }
    } else {
      res.status(201).json({ msg: "Username allready extits.." });
    }

    // const exitsUser = await user.findOne({
    //   username: req.body.username,
    //   email: req.body.email,
    // });

    // console.log(exitsUser);

    // if (!exitsUser) {
    //   req.body.password = await bcrypt.hash(req.body.password, 10);

    //   const registerUserData = await user.create(req.body);

    //   if (registerUserData) {
    //     res
    //       .status(201)
    //       .json({ register: true, msg: "User Registed Successfully..." });
    //   } else {
    //     res
    //       .status(201)
    //       .json({ register: false, msg: "User Registion failed..." });
    //   }
    // } else {
    //   res.status(201).json({ msg: "Username or Email already exits..." });
    // }
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong...", error: e });
  }
};

// Login User
const loginUser = async (req, res) => {
  console.log(req.body);

  try {
    const userData = await user.findOne({ email: req.body.email });

    if (userData) {
      if (await bcrypt.compare(req.body.password, userData.password)) {
        const token = jwt.sign({ userData }, SECRET);

        res.status(201).json({
          login: true,
          msg: "User Login Successfully...",
          token: token,
        });
      } else {
        res.status(201).json({ login: false, msg: "Password is wrong..." });
      }
    } else {
      res.status(201).json({ login: false, msg: "Email is wrong..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong..", error: e });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
