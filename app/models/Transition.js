/**
 * Entité permettant de stocker une transition
 * @param {*} filename le nom du fichier de transition
 * @param {*} order l'ordre d'affichage
 */
function Transition(filename, order) {
    this.filename = filename;
    this.order = order;
}

module.exports = Transition;