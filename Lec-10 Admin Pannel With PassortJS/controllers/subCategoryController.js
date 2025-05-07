const category = require("../models/CategoryModel");
const subCategory = require("../models/SubCategoryModel");


// Add SubCategory Page 
const addSubCategoryPage = async (req, res) => {
    try {

        const allCategory = await category.find({});

        res.render('subcategory/addSubCategoryPage', { allCategory: allCategory, success: req.flash('success'), error: req.flash('error') });
    } catch (e) {
        console.log(e);
        res.redirect('back');
    }
}


// Insert SubCategory
const insertSubCategory = async (req, res) => {
    console.log(req.body);

    try {
        const insert = await subCategory.create(req.body);

        if (insert) {
            req.flash('success', "Subcategory inserted...");
        } else {
            req.flash('error', "Subcategory insertion falied...");
        }

        res.redirect('back');
    } catch (e) {
        console.log(e);
        req.flash('error', `Exception ${e}`);
        res.redirect('back');
    }
}

module.exports = {
    addSubCategoryPage,
    insertSubCategory
}