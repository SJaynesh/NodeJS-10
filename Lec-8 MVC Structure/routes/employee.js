const express = require('express');

const route = express.Router();

const empCTR = require('../controllers/empController');

route.get('/', empCTR.empPage);

module.exports = route;