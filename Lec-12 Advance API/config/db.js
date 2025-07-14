const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/Advance-API";

mongoose.connect(URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB is connected...");
});

db.on("error", (err) => {
  console.log("DB is not connected...", err);
});

db.on("disconnected", () => {
  console.log("DB is disconnected...");
});

module.exports = db;
