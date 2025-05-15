const express = require("express");

const route = express.Router();

const {
  addSubCategoryPage,
  insertSubCategory,
  viewSubCategoryPage,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

// Add SubCategory Page
route.get("/addSubCategoryPage", addSubCategoryPage);

// Insert SubCategory
route.post("/insertSubCategory", insertSubCategory);

// View SubCategory
route.get("/viewSubCategoryPage", viewSubCategoryPage);

// delete SubCategory
route.get("/deleteSubCategory/:id", deleteSubCategory);

module.exports = route;
