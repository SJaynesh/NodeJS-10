const express = require("express");

const route = express.Router();

const {
  addProductPage,
  insertProduct,
  viewProductPage,
} = require("../controllers/productController");

const upload = require("../middleware/productMulter");

// Add Product Page
route.get("/addProductPage", addProductPage);
// Insert Product
route.post("/insertProduct", upload.single("product_image"), insertProduct);

// View Products
route.get("/viewProductsPage", viewProductPage);
module.exports = route;
