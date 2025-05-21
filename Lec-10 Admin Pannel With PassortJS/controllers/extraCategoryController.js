const Category = require("../models/CategoryModel");
const SubCategory = require("../models/SubCategoryModel");
const ExtraCategory = require("../models/ExtraCategoryModel");

// Add Extra Category Page
const addExtraCategoryPage = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    const allSubCategory = await SubCategory.find({});

    if (allCategory && allSubCategory) {
      res.render("extracategory/addExtraCategoryPage", {
        success: req.flash("success"),
        error: req.flash("error"),
        allCategory,
        allSubCategory,
      });
    } else {
      res.redirect("back");
    }
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

// Insert Extra Categoru
const insertExtraCategory = async (req, res) => {
  console.log(req.body);

  try {
    const insertExtraCategory = await ExtraCategory.create(req.body);

    insertExtraCategory
      ? req.flash("success", `${req.body.extraCategory_title} is interted...`)
      : req.flash(
          "error",
          `${req.body.extraCategory_title} is intertion failed...`
        );

    res.redirect("back");
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

// View Extra Category Page
const viewExtraCategoryPage = async (req, res) => {
  try {
    const allExtraCategory = await ExtraCategory.find()
      .populate("category_id")
      .populate("subCategory_id");

    console.log(allExtraCategory);

    allExtraCategory
      ? res.render("extracategory/viewExtraCategoryPage", {
          success: req.flash("success"),
          error: req.flash("error"),
          allExtraCategory,
        })
      : res.redirect("back");
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

module.exports = {
  addExtraCategoryPage,
  insertExtraCategory,
  viewExtraCategoryPage,
};
