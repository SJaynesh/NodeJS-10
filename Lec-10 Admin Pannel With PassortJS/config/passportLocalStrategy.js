const passport = require('passport');
const localStrategy = require('passport-local').Strategy;  // constructor

const admin = require('../models/AdminModel');

passport.use(new localStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    const adminData = await admin.findOne({ email: email });

    if (adminData) {
        if (adminData.password == password) {
            return done(null, adminData);
        } else {
            return done(null, false);
        }
    } else {
        return done(null, false);
    }
}));


passport.serializeUser(function (admin, done) {
    return done(null, admin.id);
})

passport.deserializeUser(async function (id, done) {
    const authAdmin = await admin.findById(id);

    if (authAdmin) {
        return done(null, authAdmin);
    } else {
        return done(null, false);
    }
})


module.exports = passport;
