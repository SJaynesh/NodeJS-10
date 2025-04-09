const admin = require('../models/AdminModel');
const fs = require('fs');

// Login

const loginPage = (req, res) => {
    // res.cookie('admin', "Jaynesh");

    console.log(req.cookies.admin);
    if (req.cookies.admin == undefined) {
        res.render('login');
    } else {
        res.redirect('/dashboard')
    }
}

const userChecked = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await admin.findOne({ email: email });

        if (user) {
            if (user.password == password) {
                console.log("Login Successfully...");

                res.cookie('admin', user);
                res.redirect('/dashboard');
            } else {
                console.log("Password not matched");

                res.redirect('/');
            }
        } else {
            console.log("Email not matched");
            res.redirect('/');
        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
    // res.redirect('/dashboard');
}

// Logout 
const logout = (req, res) => {
    res.clearCookie('admin');
    res.redirect('/')
}

// Change Password

const changePassword = (req, res) => {
    const currentAdmin = req.cookies.admin;
    res.render('changePassword.ejs', { currentAdmin });
}

const changeMyNewPassword = (req, res) => {
    console.log(req.body);

    res.redirect('/');
}

// DashBoard

const dashboardPage = (req, res) => {
    if (req.cookies.admin == undefined) {
        res.redirect('/');
    } else {
        const currentAdmin = req.cookies.admin;
        console.log(currentAdmin);

        res.render('dashboard', { currentAdmin });
    }
}

const addAdminPage = (req, res) => {
    if (req.cookies.admin == undefined) {
        res.redirect('/');
    } else {
        const currentAdmin = req.cookies.admin;
        res.render('addAdmin', { currentAdmin });
    }
}

const viewAdminPage = async (req, res) => {

    if (req.cookies.admin == undefined) {
        res.redirect('/');
    } else {
        try {
            const records = await admin.find({});
            const currentAdmin = req.cookies.admin;

            res.render('viewAdmin', { records, currentAdmin });
        } catch (e) {
            res.send(`<p> Not Found : ${e} </p>`);
        }
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
    loginPage,
    userChecked,
    dashboardPage,
    addAdminPage,
    viewAdminPage,
    insertAdminData,
    deleteAdmin,
    updateAdmin,
    editAdmin,
    logout,
    changePassword,
    changeMyNewPassword
}