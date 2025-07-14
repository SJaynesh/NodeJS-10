const admin = require('../models/AdminModel');
const fs = require('fs');
const nodemailer = require('nodemailer');

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


// Lost Password

const lostPassword = (req, res) => {
    res.render('auth/lostPassword');
}

const checkEmail = async (req, res) => {
    console.log(req.body);

    const email = req.body.email;

    const data = await admin.findOne({ email: email });

    console.log(data);


    if (data) {

        // Send OTP Mail

        // Init Mail
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            service: "gmail",
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "rw5.jaynesh.pc@gmail.com",
                pass: "cbsrmclmeravauug",
            },
        });


        // Send Mail

        const OTP = Math.floor(Math.random() * 999999);

        const info = await transporter.sendMail({
            from: '"Matrix Admin 👻" rw5.jaynesh.pc@gmail.com', // sender address
            to: email, // list of receivers
            subject: "One-Time Password (OTP) for Forget Password", // Subject line
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                  }
                  .container {
                    background-color: #ffffff;
                    max-width: 600px;
                    margin: 30px auto;
                    padding: 30px;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                  }
                  .title {
                    text-align: center;
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 5px;
                  }
                  .underline {
                    width: 60px;
                    height: 3px;
                    background-color: #007BFF;
                    margin: 0 auto 20px auto;
                  }
                  p {
                    font-size: 14px;
                    color: #333;
                    line-height: 1.6;
                  }
                  .otp-box {
                    font-size: 18px;
                    font-weight: bold;
                    background-color: #f1f1f1;
                    padding: 10px 15px;
                    border-left: 5px solid #007BFF;
                    margin: 10px 0 20px 0;
                    display: inline-block;
                  }
                  .footer {
                    margin-top: 30px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="title">One-Time Password</div>
                  <div class="underline"></div>
                  <p>Hi,</p>
                  <p>
                    To enhance the security of your account, we have implemented Two-Factor Authentication (2FA) for your account. To ensure it's you logging in, we are providing you with a One-Time Password (OTP) via email.
                  </p>
                  <p>Please find your OTP below:</p>
                  <div class="otp-box">OTP: ${OTP}</div>
                  <p>
                    Enter the OTP accurately and within 10 minutes. It is valid for a single use only and should not be shared with anyone, including our support staff.
                  </p>
                  <p>Thank you for your cooperation.</p>
                  <div class="footer">
                    <p>Regards,<br>Jaynesh Sarkar</p>
                  </div>
                </div>
              </body>
              </html>
            `,
        });

        console.log("Message sent: %s", info.messageId);

        if (info.messageId) {
            // OTP Page
            res.cookie('OTP', OTP);
            res.cookie('email', email);
            res.redirect('/otpVerifyPage')
        } else {
            res.redirect('/lostPasswordPage');
        }

    } else {
        res.redirect('/lostPasswordPage')
    }
}

const otpVerifyPage = (req, res) => {
    res.render('auth/otpVerify');
}

const checkOTP = (req, res) => {
    console.log(req.body);
    console.log(req.cookies.OTP);


    if (req.body.OTP == req.cookies.OTP) {
        res.redirect('/newSetPasswordPage');
    } else {
        res.redirect('back');
        console.log("OTP has not matched...");
    }
}

const newSetPasswordPage = (req, res) => {
    res.render('auth/newSetPassword');
}

const checkNewPassword = async (req, res) => {
    console.log(req.body);

    try {
        if (req.body.newPassword == req.body.conformPassword) {
            const email = req.cookies.email;

            const data = await admin.findOne({ email: email });

            if (data) {
                const updatePass = await admin.findByIdAndUpdate(data.id, { password: req.body.newPassword });
                if (updatePass) {
                    console.log("Password Updated...");

                    res.clearCookie('email');
                    res.clearCookie('OTP');
                    res.redirect('/');

                } else {
                    console.log("Password not updated....");

                    res.redirect('back');
                }
            } else {
                console.log("Email is not valid...");

                res.redirect('back');
            }
        } else {
            console.log("New Password and Conform Password has not matched....");

            res.redirect('back');
        }

    } catch (e) {
        res.send(`Not Found : ${e}`);
    }
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
    lostPassword,
    checkEmail,
    otpVerifyPage,
    checkOTP,
    userChecked,
    newSetPasswordPage,
    checkNewPassword,
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