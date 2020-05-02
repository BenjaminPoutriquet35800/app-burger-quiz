const express = require('express');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const path = require('path');
const flash = require('connect-flash')
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

const confServer = require('./config/config-server');

//Variable globale stockant le chemin de base de l'app (compatibilité linux pour les paths)
global.__basedir = confServer.rootDir;

app.use(express.static(path.join(confServer.rootDir, '/views/public/')));
app.use('/qrcode', express.static(path.join(confServer.rootDir, '/node_modules/qrcode/build/')));

app.set('views', path.join(confServer.rootDir, 'views/'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// session secret
app.use(session({
  secret: '6RU8WwGOiQ54sKJtxw1CfmL9Ve5phvQd',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Configuration de passport
require('./config/passport')(passport);

// On l'inject dans le router
require('./app/routes')(app, passport);

// On déclare le jeu ici
require('./app/game')(io);

// Récupération des méthodes utilitaires concernant le réseau
const starter = require('./config/starter');
const port  = process.env.PORT || confServer.network.port;

http.listen(port, () => starter.messagesToDisplayWhenServerStart(port));
