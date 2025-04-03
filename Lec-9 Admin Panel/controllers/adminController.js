const admin = require('../models/AdminModel');
const fs = require('fs');


const dashboardPage = (req, res) => {
    res.render('dashboard');
}

const addAdminPage = (req, res) => {
    res.render('addAdmin');
}

const viewAdminPage = async (req, res) => {

    try {
        const records = await admin.find({});

        res.render('viewAdmin', { records });
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
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
        res.redirect('/addAdmin');
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
}

const deleteAdmin = async (req, res) => {
    const delId = req.params.delId;

    try {

        const data = await admin.findById(delId);

        if (data) {
            console.log(data.avatar);

            fs.unlinkSync(data.avatar);

            await admin.findByIdAndDelete(delId);

            res.redirect('/viewAdmin');
        } else {
            console.log("Single Record not found....");

        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }

}

const updateAdmin = async (req, res) => {
    const updateId = req.query.id;

    try {
        const data = await admin.findById(updateId);

        if (data) {
            res.render('updateAdmin', { data });
        } else {
            console.log("Single Record not found...");

        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }

}

const editAdmin = async (req, res) => {
    const editId = req.params.editId;

    const data = await admin.findById(editId);

    try {
        if (req.file) {
            // unlink
            // update
        } else {
            req.body.avatar = data.avatar;

            try {
                await admin.findByIdAndUpdate();
            } catch (e) {
                res.send(`<p> Not Found : ${e} </p>`);
            }
        }

    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
}

module.exports = {
    dashboardPage,
    addAdminPage,
    viewAdminPage,
    insertAdminData,
    deleteAdmin,
    updateAdmin,
    editAdmin,
}