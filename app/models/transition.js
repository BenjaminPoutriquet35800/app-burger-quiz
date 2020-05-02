/**
 * Entité permettant de stocker une transition
 * @param {*} filename le nom du fichier de transition
 * @param {*} label le nom de la transition
 * @param {*} order l'ordre d'affichage
 */
function Transition(filename, label, order) {
    this.filename = filename;
    this.order = order;
    this.label = label;
}

module.exports = Transition;
