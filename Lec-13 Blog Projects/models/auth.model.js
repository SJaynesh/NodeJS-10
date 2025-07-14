const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    phone: String,
    topic: Array,
    //   role: {
    //     type: String,
    //     enum: ["Admin", "Teacher", "Student"],
    //   },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", authSchema, "Users");
