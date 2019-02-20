/**
 * Composants lié à la partie
 */
$titlePart = $('#title-part');
$descriptionPart = $('#description-part');
$imagePart = $('imgae-part');

/**
 * Composants lié aux nuggets
 */
$questionNuggets = $('#question-nuggets');
$reponseANuggets = $('#response-a-nuggets');
$reponseBNuggets = $('#response-b-nuggets');
$reponseCNuggets = $('#response-c-nuggets');
$reponseDNuggets = $('#response-d-nuggets');
$buttonAddQuestionNuggets = $('#button-add-question-nuggets');
$buttonRegsiterChangesQuestionNuggets = $('#button-register-changes-question-nuggets');
$buttonCancelChangesQuestionNuggets = $('#button-cancel-changes-question-nuggets');

$tableNuggetsQuestions = $('#table-nuggets-questions');

/**
 * L'objet partie que l'on va enregistrer par la suite
 */
var partToSave = new Part();

/**
 * Callback a setter pour modifier les informations
 * D'une question nuggets
 */
var callBackModifyNuggetsQuestion;

/**
 * Class Css Bootstrap qui sera setté pour un champ invalide
 */
const isInvalidCssClass = 'is-invalid';
/**
 * Le timeout par défaut pour dépop les messages
 */
const defaultTimeoutAlertifyMessage = 3;

/**
 * Se charge de vider les inputs pour le formulaire nuggets
 */
const cleanupInputsForNuggets = function () {
    $questionNuggets.val('');
    $reponseANuggets.val('');
    $reponseBNuggets.val('');
    $reponseCNuggets.val('');
    $reponseDNuggets.val('');
}

/**
 * Se charge de créer une ligne dans le tableau
 * Pour les questions nuggets
 * @param {*} index Index de la question
 */
const createRowForTableNuggets = function (question) {
    var buttonModify = createButton(null, 'btn btn-primary m-2', function () {
        editNuggetsQuestion(question);
    });
    var buttonDelete = createButton(null, 'btn btn-danger', function () {
        removeNuggetsQuestion(question);
    })

    buttonModify.append(createIcon('fa fa-pencil-square-o'));
    buttonDelete.append(createIcon('fa fa-trash'));

    // Récupère l'index de la question dans la collection
    var index = retrieveIndexQuestionNuggetsById(question);

    // Construit la ligne
    $tableNuggetsQuestions.find('tbody')
        .append($(`<tr id = ${question._id}>`)
            .append($('<td>').append(index + 1))
            .append($(`<td data-name='question'>`).append($questionNuggets.val()))
            .append($('<td>').append(buttonModify).append(buttonDelete))
        )
}

const modifyQuestionInTableNuggets = function (index) {
    $tableNuggetsQuestions.find('tbody');
}

/**
 * Se charge de setter les informations pour une partie
 */
const registerPartInformations = function () {
    partToSave.title = $titlePart.val();
    partToSave.desciption = $descriptionPart.val();
    partToSave.image = $imagePart.val();
}

/**
 * Construit un objet réponse nugget depuis l'input passé en paramètre
 * @param {*} $input L'input permettant de récupérer la valeur textuelle
 */
const createResponseNuggetFromInput = function ($input) {
    return {
        wording: $input.val()
    };
}

/**
 * Se charge de créer depuis les inputs une question de type nuggets
 */
const createNuggetsQuestionFromInputs = function () {
    return {
        // Génère un id unique pour une question
        _id: Math.random().toString(36).slice(2),
        wording: $questionNuggets.val(),
        responses: [
            createResponseNuggetFromInput($reponseANuggets),
            createResponseNuggetFromInput($reponseBNuggets),
            createResponseNuggetFromInput($reponseCNuggets),
            createResponseNuggetFromInput($reponseDNuggets),
        ]
    };
}

/**
 * Se charge d'ajouter une question pour les nuggets
 */
const addNuggetsQuestion = function () {
    var question = createNuggetsQuestionFromInputs();
    partToSave.nuggets.questions.push(question);
    return question;
}

/**
 * Se charge d'editer une question pour un index donné
 * @param {*} index L'index permettant de récupérer la question dans la collection
 */
const editNuggetsQuestion = function (question) {
    if (question === undefined) {
        alertify.error(`Impossible d'éditer la question actuellement`);
        return;
    }
    $questionNuggets.val(question.wording);
    $reponseANuggets.val(question.responses[0].wording);
    $reponseBNuggets.val(question.responses[1].wording);
    $reponseCNuggets.val(question.responses[2].wording);
    $reponseDNuggets.val(question.responses[3].wording);

    // Cache le bouton d'ajout
    $buttonAddQuestionNuggets.hide();
    // Affiche les boutons de modifications
    $buttonRegsiterChangesQuestionNuggets.show();
    $buttonCancelChangesQuestionNuggets.show();

    /**
     * Sette la callback permettant de modifier la question
     */
    callBackModifyNuggetsQuestion = function () {
        modifyNuggetQuestion(question);
    }
}

/**
 * Se charge de modifier une question pour les nuggets
 * @param {*} index la position de la question dans la collection
 */
const modifyNuggetQuestion = function (question) {
    // Vérifie que la question pas undefined ou null
    if (question === undefined || question === null) {
        alertify.error('Impossible de pousser la modification pour cette question');
        return;
    }
    // Vérifie si il y'a un id
    if (question._id === undefined || question._id.trim() === '') {
        alertify.error(`Impossible de pousser la modification pour cette question ` +
            `car aucun id n'est défini`);
        return;
    }
    validateQuestionNuggets();
    // Récupère l'index de la question grâce à l'id
    var index = retrieveIndexQuestionNuggetsById(question);
    // Mon modifie la question avec les nouvelles valeurs
    partToSave.nuggets.questions[index] = createNuggetsQuestionFromInputs();
}

/**
 * Retire une question de la collection nuggets
 * @param {*} index La position de la question dans la collection
 */
const removeNuggetsQuestion = function (question) {
    var index = retrieveIndexQuestionNuggetsById(question);
    partToSave.nuggets.questions.splice(index, 1);
}

/**
 * Récupère la postion d'une question nuggets dans la collection
 * @param {*} question la question permettant de récupérer l'index
 */
const retrieveIndexQuestionNuggetsById = function (question) {
    return partToSave.nuggets.questions.findIndex(function (item) {
        return item._id === question._id
    });
}

/**
 * Se charge de valider le formulaire pour les questions de type nuggets
 */
const validateQuestionNuggets = function () {
    CheckInputGroups([
        $questionNuggets,
        $reponseANuggets,
        $reponseBNuggets,
        $reponseCNuggets,
        $reponseDNuggets
    ], 'Merci de renseigner les champs invalide pour les nuggets')
}

/**
 * Se charge d'initialiser les events de la page
 */
const initEvents = function () {
    /**
     * Se charge d'ajouter une question de type nuggets
     */
    $buttonAddQuestionNuggets.click(function () {
        try {
            validateQuestionNuggets();
            var question = addNuggetsQuestion();
            createRowForTableNuggets(question);
            cleanupInputsForNuggets();
            alertify.success('Question pour les nuggets ajoutée', defaultTimeoutAlertifyMessage);
        } catch (error) {
            alertify.error(error.message);
        }
    });

    /**
     * Se charge de modifier une question pour les nuggets
     */
    $buttonRegsiterChangesQuestionNuggets.click(function () {
        callBackModifyNuggetsQuestion();
        cleanupInputsForNuggets();
        hiddenRegisterCancelChangesQuestionNuggets();
        $buttonAddQuestionNuggets.show();
    })

    /**
     * Se charge de nettoyer le formulaire et d'afficher les bons boutons
     * Lorsque l'utilisateur souhaite annuler la modification d'une question
     */
    $buttonCancelChangesQuestionNuggets.click(function () {
        cleanupInputsForNuggets();
        hiddenRegisterCancelChangesQuestionNuggets();
        $buttonAddQuestionNuggets.show();
    });
}

const initVisibilityButtons = function () {
    // Cache les boutons de modification par défaut
    $buttonRegsiterChangesQuestionNuggets.hide();
    $buttonCancelChangesQuestionNuggets.hide();
}

/**
 * Cache les boutons de modification ou d'annulation
 * Lors de l'édition d'une question
 */
const hiddenRegisterCancelChangesQuestionNuggets = function () {
    $buttonRegsiterChangesQuestionNuggets.hide();
    $buttonCancelChangesQuestionNuggets.hide();
}

/**
 * Se charge de vérifier si un input est vide
 * Si c'est le cas color l'input et lève une exception
 * @param {*} $input 
 * @param {*} message 
 */
const CheckInputIfEmpty = function ($input, message) {
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
 * @param {*} message 
 */
const CheckInputGroups = function ($inputs, message) {
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

/**
 * Initialisation de la visibilité des boutons
 */
initVisibilityButtons();

/**
 * Lance l'initialisation des évènements
 */
initEvents();