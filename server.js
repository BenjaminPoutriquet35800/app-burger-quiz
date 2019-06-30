const express = require('express');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const path = require('path');
const flash = require('connect-flash')
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
//Variable globale stockant le chemin de base de l'app (compatibilité linux pour les paths)
global.__basedir = __dirname;

// Récupération de l'objet de configuration
const config = require('./app/config/server-configuration');

app.use('/alertifyjs', express.static(__dirname + '/node_modules/alertifyjs/build/'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/'));
app.use(express.static(__dirname + config.views.pathPublicResource));
app.set('views', path.join(__dirname, config.views.pathViews));
app.set('view engine', config.views.templatingEngine);
app.use(bodyParser());

// session secret
app.use(session(config.passport));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Configuration de passport
require('./app/config/passport')(passport);
// On l'inject dans le router
require('./app/routes/routes')(app, passport);
// On déclare le jeu ici
require('./app/controllers/game')(io);
// Etablit la connexion à la base de données MongoDb
require('./app/config/mongo-configuration')();

// Démarrage du serveur
http.listen(config.server.port, function () {
  console.log(`listening on *:${config.server.port}`);
});