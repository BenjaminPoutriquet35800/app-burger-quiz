module.exports = function (app, passport, basePathViews) {

    /**
     * Route par défaut choix des équipes
     */
    app.get("/", function (req, res) {
        res.render(basePathViews + "game/team-choice");
    });

    /**
     * Choix des équipes
     */
    app.get("/buzzer", function (req, res) {
        let team = req.query.team;
        // Si aucune team n'a été déterminé on renvoie sur la page
        if (!team) {
            res.redirect("/");
            return;
        }
        res.render(basePathViews + "game/buzzer", {
            team: team
        });
    });

    /**
     * Ecran de jeu
     */
    app.get("/game", function (req, res) {
        res.render(basePathViews + "game/game");
    });

    /** Securité */

    /**
     * Formulaire de login
     */
    app.get("/login", function (req, res) {
        res.render(basePathViews + "game/login");
    });

    // Permet d'authentifier l'admin
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/game/admin',
            failureRedirect: '/game/login',
            failureFlash: true
        })
    );

    /**
     * Télécommande admin pour animer le jeu
     */
    app.get("/admin", function (req, res) {
        res.render(basePathViews + "game/admin");
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