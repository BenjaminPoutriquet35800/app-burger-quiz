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
const createRowForTableNuggets = function (index) {
    var buttonModify = createButton(null, 'btn btn-primary m-2', function () {
        editNuggetsQuestion(index);
    });
    var buttonDelete = createButton(null, 'btn btn-danger', function () {
        removeNuggetsQuestion(index);
    })

    buttonModify.append(createIcon('fa fa-pencil-square-o'));
    buttonDelete.append(createIcon('fa fa-trash'));

    // Construit la ligne
    $tableNuggetsQuestions.find('tbody')
        .append($('<tr>')
            .append($('<td>').append(index + 1))
            .append($('<td>').append($questionNuggets.val()))
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
    var index = partToSave.nuggets.questions.push(createNuggetsQuestionFromInputs());
    return index - 1;
}

/**
 * Se charge d'editer une question pour un index donné
 * @param {*} index L'index permettant de récupérer la question dans la collection
 */
const editNuggetsQuestion = function (index) {
    var question = partToSave.nuggets.questions[index];
    if (question === undefined) {
        alertify.error('Impossible de modifier la question avec cet index');
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
        modifyNuggetQuestion(index);
    }
}

/**
 * Se charge de modifier une question pour les nuggets
 * @param {*} index la position de la question dans la collection
 */
const modifyNuggetQuestion = function (index) {
    partToSave.nuggets.questions[index] = createNuggetsQuestionFromInputs();
}

/**
 * Retire une question de la collection nuggets
 * @param {*} index La position de la question dans la collection
 */
const removeNuggetsQuestion = function (index) {
    partToSave.nuggets.questions.splice(index, 1);
}

/**
 * Se charge d'initialiser les events de la page
 */
const initEvents = function () {
    /**
     * Se charge d'ajouter une question de type nuggets
     */
    $buttonAddQuestionNuggets.click(function () {
        var index = addNuggetsQuestion();
        createRowForTableNuggets(index);
        cleanupInputsForNuggets();
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
 * Initialisation de la visibilité des boutons
 */
initVisibilityButtons();

/**
 * Lance l'initialisation des évènements
 */
initEvents();