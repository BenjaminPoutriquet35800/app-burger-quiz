module.exports = function (app, baseDirname) {

  /**
   * Le chemin de base où se trouve les views
   */
  const basePathViews = baseDirname + '/views/';

  app.get("/", function (req, res) {
    res.sendFile(basePathViews + "team-choice.html");
  });

  app.get("/admin", function (req, res) {
    res.sendFile(basePathViews + "admin.html");
  });

  app.get("/login", function (req, res) {
    res.sendFile(basePathViews + "login.html");
  });

  app.get("/teams", function (req, res) {
    res.sendFile(bbasePathViews + "team-choice.html");
  });

  app.get("/game", function (req, res) {
    res.sendFile(basePathViews + "game.html");
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