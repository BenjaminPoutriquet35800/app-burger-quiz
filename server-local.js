const server = require('./express/server');

// Récupération des méthodes utilitaires concernant le réseau
const starter = require('./config/starter');
const port  = process.env.PORT || server.confServer.network.port;

server.http.listen(port, () => starter.messagesToDisplayWhenServerStart(port));
