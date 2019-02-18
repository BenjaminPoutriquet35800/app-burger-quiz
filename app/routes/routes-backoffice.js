const PartRespository = require('../../backoffice/repositories/partRepository');

module.exports = function (app, basePathViews) {
    /**
     * Accès aux données des parties
     */
    const partRepository = new PartRespository();

    /**
     * Liste des parties
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
     * Route permettant la création d'une nouvelle partie
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