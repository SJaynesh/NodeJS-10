const admin = require('../models/AdminModel');


const dashboardPage = (req, res) => {
    res.render('dashboard');
}

const addAdminPage = (req, res) => {
    res.render('addAdmin');
}

const viewAdminPage = (req, res) => {
    res.render('viewAdmin');
}

// CRUD

const insertAdminData = async (req, res) => {
    console.log(req.body);

    console.log(req.file);


    try {
        req.body.avatar = req.file.path;


        const insert = await admin.create(req.body);

        if (insert) {
            console.log("Admin Data is Inserted...");
        } else {
            console.log("Admin Data is not insertion...");
        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }


    res.redirect('/addAdmin');
}

module.exports = {
    dashboardPage,
    addAdminPage,
    viewAdminPage,
    insertAdminData,
}