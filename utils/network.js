const os = require('os');

/**
 * Se charge de récupérer toutes adresses ip's disponible
 */
const getIpAddressServer = function () {
    const ipAddress = [];
    const ifaces = os.networkInterfaces();
    const keys = Object.keys(ifaces);
    try {
        for (let index = 0; index < keys.length; index++) {
            const ifname = keys[index];
            const interfaces = ifaces[ifname];
            for (let i = 0; i < interfaces.length; i++) {
                const iface = interfaces[i];
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    continue;
                }
                ipAddress.push(iface.address);
            }
        }
    } catch (error) {
        console.log(error);
    }
    return ipAddress;
}

/**
 * Vérifie si l'hôte passé en paramètre est une adresse de loopback
 * @param {*} host 
 */
const isLocalHostname = function (hostname) {
    return hostname === "localhost" || hostname === "127.0.0.1";
}

module.exports = {
    getIpAddressServer,
    isLocalHostname
}

