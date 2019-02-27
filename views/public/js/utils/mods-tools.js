/**
 * Génère un unique id à la volée
 */
const generateUniqueId = function () {
    return Math.random().toString(36).slice(2);
}

/**
 * Tronque le texte si trop long
 * @param {*} text le texte que l'on va tronquer
 * @param {*} truncateLenght La longueur max avant tronquage
 * @param {*} textEnding Ceux par quoi le text doit terminer.
 * Si rien n'est renseigné se termine par '...'
 */
const truncateText = function (text, truncateLenght, textEnding) {
    if (textEnding == null) {
        textEnding = '...';
      }
    if (text.length > truncateLenght)
        return text.substring(0, truncateLenght - textEnding.length) + textEnding;
    return text;
}