const PartRespository = require('../repositories/backoffice/partRepository');

module.exports = function (app, basePathViews) {
    /**
     * Accès aux données des parties
     */
    const partRepository = new PartRespository();

    /**
     * Route permettant de rendre la vue avecc la liste des parties
     */
    app.get("/parts", function (req, res) {
        partRepository.findAll(function (err, parts) {
            res.render(basePathViews + "/backoffice/parts/list", {
                error: err,
                parts: parts
            });
        });
    });

    /**
     * Route permettant de rendre la vue pour la création d'une nouvelle partie
     */
    app.get("/part/create", function (req, res) {
        res.render(basePathViews + "/backoffice/parts/create");
    });

    /**
    * Route permettant la création d'une nouvelle partie
    */
    app.get("/part/edit/:id", function (req, res) {
        res.render(basePathViews + "/backoffice/parts/edit");
    });
}