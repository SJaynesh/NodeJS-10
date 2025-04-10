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
    if (currentAdmin != undefined) {
        res.render('changePassword.ejs', { currentAdmin });
    } else {
        res.redirect('/');
    }
}

const changeMyNewPassword = async (req, res) => {
    console.log(req.body);

    const { currentPassword, newPassword, conformPassword } = req.body;

    const myAdmin = req.cookies.admin;

    if (currentPassword == myAdmin.password) {
        if (newPassword != myAdmin.password) {
            if (newPassword == conformPassword) {
                try {
                    const isUpdate = await admin.findByIdAndUpdate(myAdmin._id, { password: newPassword });
                    if (isUpdate) {
                        console.log("Password updated...", isUpdate);
                        res.clearCookie('admin');
                        res.redirect('/');
                    } else {
                        console.log("Password updation failed...");

                    }
                } catch (e) {
                    res.send(`<p> Not Found : ${e} </p>`);
                }
            } else {
                res.redirect('/changePassword');
            }
        } else {
            res.redirect('/changePassword');
        }
    } else {
        console.log("Password is incorrect............");

        res.redirect('/changePassword');
    }

}

// View Profile 

const viewProfile = (req, res) => {
    const currentAdmin = req.cookies.admin;
    if (currentAdmin != undefined) {
        res.render('profile', { currentAdmin });
    } else {
        res.redirect('/');
    }
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
            let records = await admin.find({});
            const currentAdmin = req.cookies.admin;

            records = records.filter((data) => data.id != currentAdmin._id);

            console.log("User Data", records);


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
        const currentAdmin = req.cookies.admin;

        if (data) {
            res.render('updateAdmin', { data, currentAdmin });
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
    changeMyNewPassword,
    viewProfile
}