module.exports = function (app, passport) {

  var LocalStrategy = require('passport-local').Strategy;

  var basePath = '/views/';

  app.get("/", function (req, res) {
    res.sendFile(__dirname + basePath + "team-choice.html");
  });

  app.get("/admin", isLoggedIn, function (req, res) {
    res.sendFile(__dirname + basePath + "admin.html");
  });

  app.get("/login", function (req, res) {
    res.sendFile(__dirname + basePath + "login.html");
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.get("/teams", function (req, res) {
    res.sendFile(__dirname + basePath + "team-choice.html");
  });

  app.get("/game", function (req, res) {
    res.sendFile(__dirname + basePath + "game.html");
  });

  /**
   * Middleware permettant de savoir si l'utilisateur est logguéœ
   * Uniquement pour la partie admin
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  function isLoggedIn(req, res, next) {
    // Si l'utilisateur est authentifié on passe à la requête suivante
    if (req.isAuthenticated())
      return next();
    // Si c'est pas le cas on le redirige vers la page d'authentification
    res.redirect('/login');
  }
}