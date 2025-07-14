const express = require("express");
const db = require("./config/db");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error : ", err);
    return false;
  }
  console.log("Server is started....");
});
