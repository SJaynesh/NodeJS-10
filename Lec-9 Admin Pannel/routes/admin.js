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

const { loginPage, lostPassword, checkEmail, otpVerifyPage, checkOTP, newSetPasswordPage, checkNewPassword, userChecked, dashboardPage, addAdminPage, viewAdminPage, insertAdminData, deleteAdmin, updateAdmin, editAdmin, logout, changePassword, changeMyNewPassword, viewProfile } = require('../controllers/adminController');

// Login 
route.get('/', loginPage);

route.post('/login', userChecked);

// Lost Password

route.get('/lostPasswordPage', lostPassword);
route.post('/checkEmail', checkEmail);
route.get('/otpVerifyPage', otpVerifyPage);
route.post('/checkOTP', checkOTP);
route.get('/newSetPasswordPage', newSetPasswordPage);
route.post('/checkNewPassword', checkNewPassword);

// Dashboard

route.get('/dashboard', dashboardPage);

route.get('/addAdmin', addAdminPage);
route.get('/viewAdmin', viewAdminPage);

// Logout
route.get('/logout', logout);

// Change Password
route.get('/changePassword', changePassword);
route.post('/changeMyNewPassword', changeMyNewPassword);

// View Profile
route.get('/viewProfile', viewProfile);

// CRUD Operation
route.post('/insertAdminData', upload.single('avatar'), insertAdminData);

route.get('/deleteAdmin/:delId', deleteAdmin);

route.get('/updateAdmin', updateAdmin);

route.post('/editAdmin/:editId', editAdmin);

module.exports = route;