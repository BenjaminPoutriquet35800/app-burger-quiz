var path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const User = require(path.join(__basedir,'app/models/user'));

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            if (username.toLowerCase() === 'admin' && password === 'burger2018') {
                let user = new User();
                user.username = username;
                user.password = password;
                user.title = 'admin';
                done(null, user);
            } else {
                done(null, false);
            }
        }
    ));
};
