const express = require('express');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const flash = require('connect-flash')
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

const messages = require('./config/messages-socket');

app.use(express.static(__dirname + '/views/public/'));
app.use(bodyParser());

app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Configuration de passport
require('./config/passport')(passport);
// On l'inject dans le router
require('./app/routes')(app, __dirname, passport);

var pointsMayo = 0;
var pointsKetchup = 0;

io.on("connection", function (socket) {

  socket.on(messages.messageClientsNeedPointsInformations, function () {
    // On emet dès que le client se connecte
    io.emit(messages.messageToClientReceivePoints, pointsMayo, pointsKetchup);
  });

  socket.on(messages.messageConnected, function () {});

  socket.on(messages.messageMayoTeam, function (message) {
    if (message === messages.messageAdd) {
      pointsMayo++;
    } else {
      pointsMayo--;
    }
    if (pointsMayo > 25) {
      pointsMayo = 25;
    }
    if (pointsMayo <= 0) {
      pointsMayo = 0
    }
    io.emit(messages.messageToClientMayo, pointsMayo);
  });

  socket.on(messages.messageKetchupTeam, function (message) {
    console.log(message);
    if (message === messages.messageAdd) {
      pointsKetchup++;
    } else {
      pointsKetchup--;
    }
    if (pointsKetchup > 25) {
      pointsKetchup = 25;
    }
    if (pointsKetchup <= 0) {
      pointsKetchup = 0
    }
    io.emit(messages.messageToClientKetchup, pointsKetchup);
  });

  socket.on(messages.messageReloadPart, function () {
    pointsMayo = 0;
    pointsKetchup = 0;
    io.emit(messages.messageToClientReloadPart);
  });

});

http.listen(3000, function () {
  console.log("listening on *:3000");
});