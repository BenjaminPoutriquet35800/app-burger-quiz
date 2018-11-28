var express = require('express');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var flash    = require('connect-flash')
var passport = require('passport');
var bodyParser   = require('body-parser');
var session      = require('express-session');

app.use(express.static(__dirname + '/views/public'));
app.use(bodyParser()); 

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Import du module passport
require('./config/passport') (passport);
// Import des routes
require('./app/routes')(app,passport);

// Import des models
var User = require('./app/models/user');
var Team = require('./app/models/team');

var pointsMayo = 0;
var pointsKetchup = 0;

const messageAdd = 'add'
const messageReloadPart = 'event-reload-part';
const messageMayoTeam = 'event-point-mayo';
const messageKetchupTeam = 'event-point-ketchup';

const messageClientsNeedPointsInformations = 'need-information-points';

const messageToClientReloadPart = 'reload-part';
const messageToClientMayo = 'point-mayo';
const messageToClientKetchup = 'point-ketchup';
const messageToClientReceivePoints = 'receive-points-teams';

io.on("connection", function (socket) {

  socket.on(messageClientsNeedPointsInformations, function () {
    // On emet dès que le client se connecte
    io.emit(messageToClientReceivePoints, pointsMayo, pointsKetchup);
  });

  socket.on("disconnect", function () {});

  socket.on(messageMayoTeam, function (message) {
    if (message === messageAdd) {
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
    io.emit(messageToClientMayo, pointsMayo);
  });

  socket.on(messageKetchupTeam, function (message) {
    if (message === messageAdd) {
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
    io.emit(messageToClientKetchup, pointsKetchup);
  });

  socket.on(messageReloadPart, function () {
    pointsMayo = 0;
    pointsKetchup = 0;
    io.emit(messageToClientReloadPart);
  });

});

http.listen(3000, function () {
  console.log("listening on *:3000");
});