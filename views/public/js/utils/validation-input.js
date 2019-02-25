
/**
 * Se charge de vérifier si un input est vide
 * Si c'est le cas color l'input et lève une exception
 * @param {*} $input 
 * @param {*} isInvalidCssClass
 * @param {*} message 
 */
const CheckInputIfEmpty = function ($input, isInvalidCssClass, message) {
    // Retire si elle existe la class d'invalidation
    $input.removeClass(isInvalidCssClass);
    if (!($input.val().trim() === ''))
        return;
    // Ajoute la class permettant d'indiquer le champ invalid
    $input.addClass(isInvalidCssClass);
    // Lève une exception
    throw new Error(message);
}

/**
 * Se charge de vérifier si la liste des inputs passé en paramètre
 * Est vide. Si un seul des inputs est vide on lève une exception
 * @param {*} $inputs 
 * @param {*} isInvalidCssClass
 * @param {*} message 
 */
const CheckInputGroups = function ($inputs, isInvalidCssClass, message) {
    var inputsInError = [];
    for (var index = 0; index < $inputs.length; index++) {
        const element = $inputs[index];
        // Retire si elle existe la class d'invalidation
        element.removeClass(isInvalidCssClass);
        if (!(element.val().trim() === ''))
            continue;
        element.addClass(isInvalidCssClass);
        inputsInError.push(element);
    }
    if (inputsInError.length > 0)
        throw new Error(message);
}
