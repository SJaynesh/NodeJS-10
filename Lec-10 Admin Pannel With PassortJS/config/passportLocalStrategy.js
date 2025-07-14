const passport = require('passport');
const localStrategy = require('passport-local').Strategy;  // constructor username , password

const admin = require('../models/AdminModel');

passport.use('local-auth', new localStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    console.log('-------------------------');
    console.log(`Email : ${email} , Password : ${password}`);
    console.log('-------------------------');

    const adminData = await admin.findOne({ email: email }); // null

    if (adminData) {
        if (adminData.password == password) {
            console.log('-------------------------');
            console.log(`Login Successfully....`);
            console.log('-------------------------');
            return done(null, adminData);
        } else {
            console.log('-------------------------');
            console.log(`Wrong Password....`);
            console.log('-------------------------');
            return done(null, false);
        }
    } else {
        console.log('-------------------------');
        console.log(`Wrong Email....`);
        console.log('-------------------------');
        return done(null, false);
    }
}));


passport.serializeUser(function (admin, done) {
    console.log('-------------------------');
    console.log("Seriallize is called....");
    console.log('-------------------------');
    return done(null, admin.id);
})

passport.deserializeUser(async function (id, done) {
    console.log('-------------------------');
    console.log("Deseriallize is called....");
    console.log('-------------------------');
    const authAdmin = await admin.findById(id);

    if (authAdmin) {
        return done(null, authAdmin);
    } else {
        return done(null, false);
    }
})


// Check Login MiddleWare
passport.checkAuthentication = function (req, res, next) {
    console.log("Auth Middlewate is called....");

    console.log("Auth : ", req.isAuthenticated());

    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

// Lost Password
passport.checkLostPasswordAuthentication = function (req, res, next) {
    console.log("Auth Middlewate is called....");

    console.log("Auth : ", req.isAuthenticated());

    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

// currentAdmin Data
passport.currentAdmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.currentAdmin = req.user;
        next();
    } else {
        next();
    }
}

module.exports = passport;
