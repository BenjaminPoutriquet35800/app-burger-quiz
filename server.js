const express = require('express');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const path = require('path');
const flash = require('connect-flash')
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static(__dirname + '/views/public/'));
app.set('views', path.join(__dirname, 'views/'));
app.use(bodyParser());

// session secret
app.use(session({
  secret: '6RU8WwGOiQ54sKJtxw1CfmL9Ve5phvQd'
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

http.listen(3000, function () {
  console.log("listening on *:3000");
});