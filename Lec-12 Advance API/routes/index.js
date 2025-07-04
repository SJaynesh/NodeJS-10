const express = require("express");
const route = express.Router();

route.use("/admin", require("./adminRoute"));
route.use("/manager", require("./managerRoute"));
route.use("/employee", require("./employeeRoute"));

module.exports = route;
