module.exports = function (app, passport) {
  /**
   * Le chemin de base où se trouve les views
   */
  const basePathViews = app.get('views');

  /**
   * Importe les routes pour jouer
   */
  require('./game')(app, passport, basePathViews);

  /**
   * Importe le back office d'édition des parties
   */
  require('./backoffice')(app,basePathViews);

  /**
   * Permet de rediriger sur la home
   * Si route introuvable
   * Attention a bien placer cette route en tout dernier !
   */
  app.use(function (req, res) {
    res.redirect('/');
  });  
}