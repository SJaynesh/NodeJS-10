const express = require('express');
const multer = require('multer');
const passport = require('passport');

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
route.get('/', passport.checkLostPasswordAuthentication, loginPage);

route.post('/login', passport.authenticate('local-auth', { failureRedirect: '/' }), userChecked);

// Lost Password

route.get('/lostPasswordPage', passport.checkLostPasswordAuthentication, lostPassword);
route.post('/checkEmail', checkEmail);
route.get('/otpVerifyPage', passport.checkLostPasswordAuthentication, otpVerifyPage);
route.post('/checkOTP', checkOTP);
route.get('/newSetPasswordPage', passport.checkLostPasswordAuthentication, newSetPasswordPage);
route.post('/checkNewPassword', checkNewPassword);

// Dashboard

route.get('/dashboard', passport.checkAuthentication, dashboardPage);

route.get('/addAdmin', passport.checkAuthentication, addAdminPage);
route.get('/viewAdmin', passport.checkAuthentication, viewAdminPage);

// Logout
route.get('/logout', logout);

// Change Password
route.get('/changePassword', passport.checkAuthentication, changePassword);
route.post('/changeMyNewPassword', changeMyNewPassword);

// View Profile
route.get('/viewProfile', passport.checkAuthentication, viewProfile);

// CRUD Operation
route.post('/insertAdminData', upload.single('avatar'), insertAdminData);

route.get('/deleteAdmin/:delId', passport.checkAuthentication, deleteAdmin);

route.get('/updateAdmin', passport.checkAuthentication, updateAdmin);

route.post('/editAdmin/:editId', editAdmin);

module.exports = route;