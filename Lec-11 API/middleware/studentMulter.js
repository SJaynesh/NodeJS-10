const multer = require("multer");

console.log("Multer is Running");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/students");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const uploads = multer({
  storage: storage,
});

module.exports = uploads;
