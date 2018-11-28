var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        // done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        console.log(req);
    }));
};