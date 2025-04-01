const express = require('express');

const route = express.Router();

console.log("Routing...");

const { dashboardPage, addAdminPage, viewAdminPage } = require('../controllers/adminController');

route.get('/', dashboardPage);

route.get('/addAdmin', addAdminPage);
route.get('/viewAdmin', viewAdminPage);

module.exports = route;