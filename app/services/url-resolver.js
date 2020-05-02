const network = require('../../utils/network');

/**
 * Se charge de récupérer l'url qui sera à générer en QR Code
 * Url qui permettra d'accèder au choix des équipes
 * @param {*} req Requête qui va permettre de déterminer l'url final
 */
const retrieveUrlForQrCodeGeneration = function (req) {
    const isLocalHostname = network.isLocalHostname(req.hostname);

    // Si ce n'est pas l'adresse de loopback on renvoie l'url tel quelle
    if (!isLocalHostname)
        return req.protocol + '://' + req.get('host');

    // Sinon on récupère l'ip du serveur
    const [serverIp] = network.getIpAddressServer();

    if (!serverIp) return '';

    // On récupère le port si présent
    const port = req.headers.host.split(':')[1]

    // Renvoie l'adresse pour les joueurs
    if (port)
        return req.protocol + '://' + serverIp + ':' + port;

    // Sinon on renvoie sans le port
    return req.protocol + '://' + serverIp
}

module.exports = {
    retrieveUrlForQrCodeGeneration
}