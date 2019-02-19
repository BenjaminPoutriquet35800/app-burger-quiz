/**
 * Se charge de créer un composant bouton
 * @param {*} value la valeur textuelle
 * @param {*} className La class css
 * @param {*} func une callback
 */
function createButton(value, className, func) {
    var button = document.createElement("button");
    button.value = value;
    button.className = className;
    button.onclick = func;
    return button;
}

/**
 * Se charge de créer une icone
 * @param {*} className La class css
 */
function createIcon(className) {
    var icon = document.createElement("i");
    icon.className = className;
    return icon;
}