const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  extracategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExtraCategory",
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  product_stock: {
    type: Number,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
});

const products = mongoose.model("Products", productSchema, "Products");

module.exports = products;
