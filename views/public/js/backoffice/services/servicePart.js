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
 * Composants lié aux sel ou poivre
 */
$themeSaltOrPepper = $('#theme-salt-pepper');
$questionSaltOrPepper = $('#question-salt-pepper');
$responseSaltOrPepper = $('#response-salt-pepper');
$buttonAddQuestionSaltOrPepper = $('#button-add-salt-pepper');
$buttonRegsiterChangesQuestionSp = $('#button-register-changes-question-sp');
$buttonCancelChangesQuestionSp = $('#button-cancel-changes-question-sp');
$tableSaltOrPepperQuestions = $('#table-salt-pepper-questions');

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
 * Se charge de setter les informations pour une partie
 */
const registerPartInformations = function () {
    partToSave.title = $titlePart.val();
    partToSave.desciption = $descriptionPart.val();
    partToSave.image = $imagePart.val();
}

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
        editNuggetsQuestion(question._id);
    });
    var buttonDelete = createButton(null, 'btn btn-danger', function () {
        removeNuggetsQuestion(question._id);
        removeQuestionInTableNuggets(question._id);
        alertify.success('Suppression de la question nuggets OK', defaultTimeoutAlertifyMessage);
    })
    // Créer les icôns pour les boutons
    buttonModify.append(createIcon('fa fa-pencil-square-o'));
    buttonDelete.append(createIcon('fa fa-trash'));
    // Récupère l'index de la question dans la collection
    var index = retrieveIndexQuestionNuggetsById(question._id);
    // Construit la ligne
    $tableNuggetsQuestions.find('tbody')
        .append($(`<tr id = ${question._id}>`)
            .append($('<td>').append(index + 1))
            .append($(`<td data-name='question'>`).append($questionNuggets.val()))
            .append($('<td>').append(buttonModify).append(buttonDelete))
        )
}

/**
 * Se charge de modifier le libellé de la question
 * Dans le tableau de rendu d'affichage
 * @param {*} id Id de la question
 */
const modifyQuestionInTableNuggets = function (id) {
    var tableRow = document.getElementById(id);
    if (tableRow === null)
        return;
    var tableCell = tableRow.querySelector('[data-name]');
    if (tableCell === null)
        return;
    var question = retrieveQuestionNuggetsById(id);
    if (question === undefined || question === null)
        return;
    tableCell.innerHTML = question.wording;
}

/**
 * Retire du tableau des nuggets la ligne que 
 * L'on souhaite supprimer visuellement
 * @param {*} id L'id permettant de supprimer la ligne
 */
const removeQuestionInTableNuggets = function (id) {
    $(`#${id}`).remove();
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
 * Grâce au formulaire
 */
const addNuggetsQuestionFromInputs = function () {
    var question = createNuggetsQuestionFromInputs();
    // Génère un id unique pour une question
    question._id = Math.random().toString(36).slice(2);
    return addNuggetsQuestion(question);
}

/**
 * Se charge d'ajouter une question pour les nuggets
 * @param {*} question la question à pousser
 */
const addNuggetsQuestion = function (question) {
    partToSave.nuggets.questions.push(question);
    return question;
}

/**
 * Se charge de modifier une question pour les nuggets
 * @param {*} id L'id permettant de récupérer la question dans la collection
 */
const modifyNuggetQuestion = function (id) {
    // Vérifie si il y'a un id
    if (id === undefined || id.trim() === '') {
        alertify.error(`Impossible de pousser la modification pour cette question car aucun id n'est défini`);
        return;
    }
    validateInputsNuggets();
    // Récupère l'index de la question grâce à l'id
    var index = retrieveIndexQuestionNuggetsById(id);
    var question = createNuggetsQuestionFromInputs();
    question = createNuggetsQuestionFromInputs();
    question._id = id;
    // Mon modifie la question avec les nouvelles valeurs
    partToSave.nuggets.questions[index] = question;
}

/**
 * Retire une question de la collection nuggets
 * @param {*} index La position de la question dans la collection
 */
const removeNuggetsQuestion = function (question) {
    var index = retrieveIndexQuestionNuggetsById(question._id);
    partToSave.nuggets.questions.splice(index, 1);
}

/**
 * Se charge d'editer une question pour un id donné
 * @param {*} id L'id permettant de récupérer la question dans la collection
 */
const editNuggetsQuestion = function (id) {
    if (id === undefined || id.trim() === '') {
        alertify.error(`Impossible d'éditer la question nuggets car l'id est null`);
        return;
    }
    var question = retrieveQuestionNuggetsById(id);
    if (question === undefined || question === null) {
        alertify.error(`Impossible d'éditer la question nuggets car elle est introuvable avec l'id ${id}`);
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
        modifyNuggetQuestion(id);
        modifyQuestionInTableNuggets(id);
    }
}

/**
 * Récupère une question nuggets grâce à son id
 * @param {*} id 
 */
const retrieveQuestionNuggetsById = function (id) {
    return partToSave.nuggets.questions.find(function (item) {
        return item._id === id;
    });
}

/**
 * Récupère la postion d'une question nuggets dans la collection
 * @param {*} id Id de la question permettant de récupérer l'index
 */
const retrieveIndexQuestionNuggetsById = function (id) {
    return partToSave.nuggets.questions.findIndex(function (item) {
        return item._id === id
    });
}

/**
 * Se charge de valider le formulaire pour les questions de type nuggets
 */
const validateInputsNuggets = function () {
    CheckInputGroups([
        $questionNuggets,
        $reponseANuggets,
        $reponseBNuggets,
        $reponseCNuggets,
        $reponseDNuggets
    ],
        isInvalidCssClass,
        `Merci de renseigner les champs invalides pour l'onglet nuggets`);
}

/**
 * Se charge de vider les inputs pour le formulaire sel ou poivre 
 * Uniquement l'input question & reponse
 */
const cleanupInputsForSaltOrPepper = function () {
    //$themeSaltOrPepper.val('');
    $questionSaltOrPepper.val('');
    $responseSaltOrPepper.val('');
}

/**
 * Se charge d'ajouter une question pour
 * Les sel ou poivre grâce au formulaire
 */
const addSaltOrPepperQuestionFromInputs = function () {
    var question = {
        _id: Math.random().toString(36).slice(2),
        question: $questionSaltOrPepper.val(),
        response: $responseSaltOrPepper.val()
    }
    return addSaltOrPepperQuestion(question);
}
/**
 * Se charge d'ajouter une question pour les sel ou poivre
 * @param {*} question la question à pousser
*/
const addSaltOrPepperQuestion = function (question) {
    partToSave.saltOrPepper.questions.push(question);
    console.log(partToSave);
    return question;
}

/**
 * Se charge de valider le formulaire pour les questions de type sel ou poivre
 */
const validateInputsSaltOrPepper = function () {
    CheckInputGroups([
        $themeSaltOrPepper,
        $questionSaltOrPepper,
        $responseSaltOrPepper
    ],
        isInvalidCssClass,
        `Merci de renseigner les champs invalides pour l'onglet sel ou poivre`);
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
            validateInputsNuggets();
            var question = addNuggetsQuestionFromInputs();
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
        try {
            callBackModifyNuggetsQuestion();
            cleanupInputsForNuggets();
            hiddenRegisterCancelChangesQuestionNuggets();
            $buttonAddQuestionNuggets.show();
            alertify.success('Question pour les nuggets modifiée', defaultTimeoutAlertifyMessage);
        } catch (error) {
            alertify.error(error.message);
        }
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

    /**
     * Se charge d'ajouter une question de type sel ou poivre
     */
    $buttonAddQuestionSaltOrPepper.click(function () {
        try {
            validateInputsSaltOrPepper();
            var question = addSaltOrPepperQuestionFromInputs();
            cleanupInputsForSaltOrPepper();
            alertify.success('Question pour sel ou poivre ajoutée', defaultTimeoutAlertifyMessage);
        } catch (error) {
            alertify.error(error.message);
        }
    });
}

/**
 * Se charge de cacher les boutons permettant l'édition d'une question
 */
const initVisibilityButtons = function () {
    // Nuggets
    hiddenRegisterCancelChangesQuestionNuggets();
    // Sel ou Poivre
    hiddenRegisterCancelChangesQuestionSp();
}

/**
 * Cache les boutons de modification ou d'annulation
 * Lors de l'édition d'une question nuggets
 */
const hiddenRegisterCancelChangesQuestionNuggets = function () {
    $buttonRegsiterChangesQuestionNuggets.hide();
    $buttonCancelChangesQuestionNuggets.hide();
}

/**
 * Cache les boutons de modification ou d'annulation
 * Lors de l'édition d'une question sel ou poivre
 */
const hiddenRegisterCancelChangesQuestionSp = function () {
    $buttonRegsiterChangesQuestionSp.hide();
    $buttonCancelChangesQuestionSp.hide();
}

/**
 * Initialisation de la visibilité des boutons
 */
initVisibilityButtons();

/**
 * Lance l'initialisation des évènements
 */
initEvents();