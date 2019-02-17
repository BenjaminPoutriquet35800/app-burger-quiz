const MongoDbHelper = require('./../utils/mongoDbHelper');

module.exports = function () {
    const initConnectionToMongoDb = function () {        
        const serverName = 'burgerQuiz';
        const baseUrl = 'mongodb://localhost/'
        const mongoDbHelper = new MongoDbHelper();        
        // Etalie la connexion avec le serveur mongoDb
        mongoDbHelper.connectToServer(baseUrl + serverName, function () {
            console.log(`Connexion à la base ${serverName} OK`);
        }, function (err) {
            console.log(`Une erreur s'est produit lors de la 
                        connexion à la base de données ${serverName}`);
            console.log(`L'erreur est la suivante : ${err}`);
        });
    }
    initConnectionToMongoDb();
}