const express = require("express");
const db = require("./config/db");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));

// Routing
app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error : ", err);
    return false;
  }
  console.log("Server is strated....");
});
