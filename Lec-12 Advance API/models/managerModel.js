const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_date: {
    type: String,
    required: true,
  },
  updated_date: {
    type: String,
    required: true,
  },
});

const managerModel = mongoose.model("Manager", managerSchema, "Managers");

module.exports = managerModel;
