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
          console.log('je demande la route')
          partRepository.findAll(function (parts) {
              console.log('je passe par là')
              res.render(basePathViews + "/backoffice/parts/list", {
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