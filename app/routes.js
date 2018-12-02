module.exports = function (app, passport) {
  /**
   * Le chemin de base où se trouve les views
   */
  const basePathViews = app.get('views'); 

  /**
   * Route par défaut choix des équipes
   */
  app.get("/", function (req, res) {
    res.sendFile(basePathViews + "team-choice.html");
  });

  /**
   * Choix des équipes
   */
  app.get("/teams", function (req, res) {
    res.sendFile(basePathViews + "team-choice.html");
  });

  /**
   * Ecran de jeu
   */
  app.get("/game", function (req, res) {
    res.sendFile(basePathViews + "game.html");
  });

  /** Securité */

  /**
   * Formulaire de login
   */
  app.get("/login", function (req, res) {
    res.sendFile(basePathViews + "login.html");
  });

  // Permet d'authentifier l'admin
  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  /**
   * Télécommande admin pour animer le jeu
   */
  app.get("/admin", function (req, res) {
    res.sendFile(basePathViews + "admin.html");
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