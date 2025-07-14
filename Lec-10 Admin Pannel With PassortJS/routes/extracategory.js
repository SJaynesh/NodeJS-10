const express = require("express");

const route = express.Router();

const {
  addExtraCategoryPage,
  insertExtraCategory,
  viewExtraCategoryPage,
} = require("../controllers/extraCategoryController");

// Add Extra Category Page
route.get("/addExtraCategoryPage", addExtraCategoryPage);

// Insert Extra Category
route.post("/insertExtraCategory", insertExtraCategory);

// View Extra Category Page
route.get("/viewExtraCategoryPage", viewExtraCategoryPage);

module.exports = route;
