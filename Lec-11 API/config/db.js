const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/API";

mongoose.connect(URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB is connected...");
});

db.on("error", (err) => {
  console.log("Error : ", err);
});

db.on("disconnected", () => {
  console.log("DB is disconnected...");
});

module.exports = db;
