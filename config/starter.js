const colors = require('colors');
const figlet = require('figlet');
const networkUtils = require('../utils/network');

const burgerQuizLabel = 'App Burger Quiz';
const anyIpAddressMessage = `> Application accessible aux adresses suivantes :`;
const singleIpAddressMessage = `> Application accessible à l'adresse suivante :`;

/**
 * Se charge d'afficher des messages d'informations lorsque le serveur démarre
 */
const messagesToDisplayWhenServerStart = function (port) {
    console.log(figlet.textSync(burgerQuizLabel));
    console.log();
    console.log(`> Le serveur à démarré sur le port : ` + `${port}`.green);
    const ipAddress = networkUtils.getIpAddressServer();
    if (ipAddress.length === 0) return;
    const message = (ipAddress.length === 1) ? singleIpAddressMessage : anyIpAddressMessage;
    console.log(message);
    for (let index = 0; index < ipAddress.length; index++) {
        const ip = ipAddress[index];
        console.log(`\t- ` + `${ip}:${port}`.underline);
    }
}

module.exports = { messagesToDisplayWhenServerStart }