const LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
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
            console.log(req);
            console.log('username : ' + username);
            console.log('password : ' + password)
            if(username === 'toto'){
                done(null,{ user: username });
            }else{
                done(null, false);
            }           
        }
    ));
};