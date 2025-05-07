const express = require('express');

const route = express.Router();

const { addSubCategoryPage, insertSubCategory } = require('../controllers/subCategoryController');

// Add SubCategory Page
route.get('/addSubCategoryPage', addSubCategoryPage);


// Insert SubCategory
route.post('/insertSubCategory', insertSubCategory);


module.exports = route;