const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage }); // Middlware


const route = express.Router();

console.log("Routing...");

const { dashboardPage, addAdminPage, viewAdminPage, insertAdminData } = require('../controllers/adminController');

route.get('/', dashboardPage);

route.get('/addAdmin', addAdminPage);
route.get('/viewAdmin', viewAdminPage);

// CRUD Operation
route.post('/insertAdminData', upload.single('avatar'), insertAdminData);

module.exports = route;