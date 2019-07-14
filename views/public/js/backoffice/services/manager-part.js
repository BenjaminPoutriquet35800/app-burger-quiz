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
 * Composants lié à l'addition
 */
$themeAddition = $('#theme-addition');
$questionAddition = $('#question-addition');
$responseAddition = $('#response-addition');
$buttonAddQuestionAddition = $('#button-add-addition');
$buttonRegsiterChangesQuestionAddition = $('#button-register-changes-question-addition');
$buttonCancelChangesQuestionAddition = $('#button-cancel-changes-question-addition');
$tableAdditionQuestions = $('#table-addition-questions');

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
 * Callback a setter pour modifier les informations
 * D'une question sel ou poivre
 */
var callBackModifySaltOrPepperQuestion;

/**
 * Callback a setter pour modifier les informations
 * D'une question addition
 */
var callBackModifyAdditionQuestion;

/**
 * Class Css Bootstrap qui sera setté pour un champ invalide
 */
const isInvalidCssClass = 'is-invalid';
/**
 * Le timeout par défaut pour dépop les messages
 */
const defaultTimeoutAlertifyMessage = 3;
/**
 * Valeur de tronquation du texte de la question que l'on affiche dans un tableau
 */
const defaultTruncateQuestionText = 45;

/**
 * Se charge de setter les informations pour une partie
 */
const registerPartInformations = function () {
    partToSave.title = $titlePart.val();
    partToSave.desciption = $descriptionPart.val();
    partToSave.image = $imagePart.val();
}

/***************************/
/*         NUGGETS         */
/***************************/

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
    baseCreateRowForTable($tableNuggetsQuestions, $questionNuggets, question, editNuggetsQuestion, function (id) {
        removeNuggetsQuestion(id);
        baseRemoveQuestionInTable(id);
        alertify.success('Suppression de la question nuggets OK', defaultTimeoutAlertifyMessage);
    });
}

/**
 * Se charge de modifier le libellé de la question
 * Dans le tableau de rendu d'affichage
 * @param {*} id Id de la question
 */
const modifyQuestionInTableNuggets = function (id) {
    baseModifyQuestionInTable(id, function (id) {
        var question = retrieveQuestionNuggetsById(id);
        if (question === undefined || question === null)
            return '';
        return question.wording;
    })
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
    $questionNuggets.focus();
    // Génère un id unique pour une question
    question._id = generateUniqueId();
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
        throw new Error(`Impossible de pousser la modification pour cette question car aucun id n'est défini`)
    }
    validateInputsNuggets();
    // Récupère l'index de la question grâce à l'id
    var index = retrieveIndexQuestionNuggetsById(id);
    var question = createNuggetsQuestionFromInputs();
    question._id = id;
    // Mon modifie la question avec les nouvelles valeurs
    partToSave.nuggets.questions[index] = question;
}

/**
 * Retire une question de la collection nuggets
 * @param {*} Id L'id de la question
 */
const removeNuggetsQuestion = function (id) {
    var index = retrieveIndexQuestionNuggetsById(id);
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

/***************************/
/*       SEL OU POUVRE     */
/***************************/

/**
 * Se charge de vider les inputs pour le formulaire sel ou poivre 
 * Uniquement l'input question & reponse
 */
const cleanupInputsForSaltOrPepper = function () {
    $questionSaltOrPepper.val('');
    $responseSaltOrPepper.val('');
}

/**
 * Se charge de créer une ligne dans le tableau
 * Pour les questions sel ou poivre
 * @param {*} question La question
 */
const createRowForTableSaltOrPepper = function (question) {
    baseCreateRowForTable($tableSaltOrPepperQuestions, $questionSaltOrPepper, question, editSaltOrPepperQuestion, function (id) {
        removeSaltOrPepperQuestion(id);
        baseRemoveQuestionInTable(id);
    });
}

/**
 * Se charge d'ajouter une question pour
 * Les sel ou poivre grâce au formulaire
 */
const addSaltOrPepperQuestionFromInputs = function () {
    var question = {
        _id: generateUniqueId(),
        question: $questionSaltOrPepper.val(),
        response: $responseSaltOrPepper.val()
    }
    $questionSaltOrPepper.focus();
    return addSaltOrPepperQuestion(question);
}

/**
 * Se charge d'ajouter une question pour les sel ou poivre
 * @param {*} question la question à pousser
 */
const addSaltOrPepperQuestion = function (question) {
    partToSave.saltOrPepper.questions.push(question);
    return question;
}

/**
 * Se charge de modifier une question pour les sel ou poivre
 * @param {*} id L'id permettant de récupérer la question dans la collection
 */
const modifySaltOrPepperQuestion = function (id) {
    // Vérifie si il y'a un id
    if (id === undefined || id.trim() === '') {
        throw new Error(`Impossible de pousser la modification pour cette question car aucun id n'est défini`)
    }
    validateInputsSaltOrPepper();
    // Récupère l'index de la question grâce à l'id
    var index = retrieveIndexQuestionSaltOrPepperById(id);
    var question = {
        question: $questionSaltOrPepper.val(),
        response: $responseSaltOrPepper.val()
    }
    question._id = id;
    // Mon modifie la question avec les nouvelles valeurs
    partToSave.saltOrPepper.questions[index] = question;
}

/**
 * Se charge de modifier le libellé de la question
 * Dans le tableau de rendu d'affichage
 * @param {*} id Id de la question
 */
const modifyQuestionInTableSaltOrPepper = function (id) {
    baseModifyQuestionInTable(id, function (id) {
        var question = retrieveQuestionSaltOrPepperById(id);
        if (question === undefined || question === null)
            return '';
        return question.question;
    })
}

/**
 * Se charge d'editer une question pour un id donné
 * @param {*} id L'id permettant de récupérer la question dans la collection
 */
const editSaltOrPepperQuestion = function (id) {
    if (id === undefined || id.trim() === '') {
        alertify.error(`Impossible d'éditer la question sel ou poivre car l'id est null`);
        return;
    }
    var question = retrieveQuestionSaltOrPepperById(id);
    if (question === undefined || question === null) {
        alertify.error(`Impossible d'éditer la question sel ou poivre car elle est introuvable avec l'id ${id}`);
        return;
    }
    $questionSaltOrPepper.val(question.question);
    $responseSaltOrPepper.val(question.response);
    // Cache le bouton d'ajout
    $buttonAddQuestionSaltOrPepper.hide();
    // Affiche les boutons de modifications
    $buttonRegsiterChangesQuestionSp.show();
    $buttonCancelChangesQuestionSp.show();
    /**
     * Sette la callback permettant de modifier la question
     */
    callBackModifySaltOrPepperQuestion = function () {
        modifySaltOrPepperQuestion(id);
        modifyQuestionInTableSaltOrPepper(id);
    }
}

/**
 * Retire une question de la collection sel ou poivre
 * @param {*} Id L'id de la question
 */
const removeSaltOrPepperQuestion = function (id) {
    var index = retrieveIndexQuestionSaltOrPepperById(id);
    partToSave.saltOrPepper.questions.splice(index, 1);
}

/**
 * Récupère une question sel ou poivre grâce à son id
 * @param {*} id 
 */
const retrieveIndexQuestionSaltOrPepperById = function (id) {
    return partToSave.saltOrPepper.questions.findIndex(function (item) {
        return item._id === id;
    });
}

/**
 * Récupère une question sel ou poivre grâce à son id
 * @param {*} id 
 */
const retrieveQuestionSaltOrPepperById = function (id) {
    return partToSave.saltOrPepper.questions.find(function (item) {
        return item._id === id;
    });
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

/***************************/
/*         ADDITION        */
/***************************/

/**
 * Se charge de vider les inputs pour le formulaire addition
 * Uniquement l'input question & reponse
 */
const cleanupInputsForAddition = function () {
    $questionAddition.val('');
    $responseAddition.val('');
}

/**
 * Se charge de créer une ligne dans le tableau
 * Pour les questions addition
 * @param {*} question La question
 */
const createRowForTableAddition = function (question) {
    baseCreateRowForTable($tableAdditionQuestions, $questionAddition, question, editAdditionQuestion, function (id) {
        removeAdditionQuestion(id);
        baseRemoveQuestionInTable(id);
    });
}

/**
 * Se charge d'ajouter une question pour
 * L'addition grâce au formulaire
 */
const addAdditionQuestionFromInputs = function () {
    var question = {
        _id: generateUniqueId(),
        question: $questionAddition.val(),
        response: $responseAddition.val()
    }
    $questionAddition.focus();
    return addAdditionQuestion(question);
}

/**
 * Se charge d'ajouter une question pour l'addition
 * @param {*} question la question à pousser
 */
const addAdditionQuestion = function (question) {
    partToSave.addition.questions.push(question);
    return question;
}

/**
 * Se charge de modifier une question pour les questions type addition
 * @param {*} id L'id permettant de récupérer la question dans la collection
 */
const modifyAdditionQuestion = function (id) {
    // Vérifie si il y'a un id
    if (id === undefined || id.trim() === '') {
        throw new Error(`Impossible de pousser la modification pour cette question car aucun id n'est défini`)
    }
    validateInputsAddition();
    // Récupère l'index de la question grâce à l'id
    var index = retrieveIndexQuestionAdditionById(id);
    var question = {
        question: $questionAddition.val(),
        response: $responseAddition.val()
    }
    question._id = id;
    // On modifie la question avec les nouvelles valeurs
    partToSave.addition.questions[index] = question;
}

/**
 * Se charge de modifier le libellé de la question
 * Dans le tableau de rendu d'affichage
 * @param {*} id Id de la question
 */
const modifyQuestionInTableAddition = function (id) {
    baseModifyQuestionInTable(id, function (id) {
        var question = retrieveQuestionAdditionById(id);
        if (question === undefined || question === null)
            return '';
        return question.question;
    })
}

/**
 * Se charge d'editer une question pour un id donné
 * @param {*} id L'id permettant de récupérer la question dans la collection
 */
const editAdditionQuestion = function (id) {
    if (id === undefined || id.trim() === '') {
        alertify.error(`Impossible d'éditer la question sel ou poivre car l'id est null`);
        return;
    }
    var question = retrieveQuestionAdditionById(id);
    if (question === undefined || question === null) {
        alertify.error(`Impossible d'éditer la question sel ou poivre car elle est introuvable avec l'id ${id}`);
        return;
    }
    $questionAddition.val(question.question);
    $responseAddition.val(question.response);
    // Cache le bouton d'ajout
    $buttonAddQuestionAddition.hide();
    // Affiche les boutons de modifications
    $buttonRegsiterChangesQuestionAddition.show();
    $buttonCancelChangesQuestionAddition.show();
    /**
     * Sette la callback permettant de modifier la question
     */
    callBackModifyAdditionQuestion = function () {
        modifyAdditionQuestion(id);
        modifyQuestionInTableAddition(id);
    }
}

/**
 * Retire une question de la collection sel ou poivre
 * @param {*} Id L'id de la question
 */
const removeAdditionQuestion = function (id) {
    var index = retrieveIndexQuestionSaltOrPepperById(id);
    partToSave.addition.questions.splice(index, 1);
}

/**
 * Récupère une question addition grâce à son id
 * @param {*} id 
 */
const retrieveQuestionAdditionById = function (id) {
    return partToSave.addition.questions.find(function (item) {
        return item._id === id;
    });
}

/**
 * Récupère la postion d'une question addition dans la collection
 * @param {*} id Id de la question permettant de récupérer l'index
 */
const retrieveIndexQuestionAdditionById = function (id) {
    return partToSave.addition.questions.findIndex(function (item) {
        return item._id === id
    });
}

/**
 * Se charge de valider le formulaire pour les questions de type addition
 */
const validateInputsAddition = function () {
    CheckInputGroups([
            $themeAddition,
            $questionAddition,
            $responseAddition
        ],
        isInvalidCssClass,
        `Merci de renseigner les champs invalides pour l'onglet addition`);
}

/***************************************/
/*          BURGER DE LA MORT          */
/***************************************/



/***************************/
/*          COMMUN         */
/***************************/

/**
 * Retire du tableau la ligne que
 * L'on souhaite supprimer visuellement
 * @param {*} id L'id permettant de supprimer la ligne
 */
const baseRemoveQuestionInTable = function (id) {
    $(`#${id}`).remove();
}

/**
 * Se charge de créer une ligne dans un tableau HTML grâce à la question passé en paramètre
 * @param {*} $table Le tableau HTML pour qui on souhaite créer la ligne
 * @param {*} $readFromInput L'input qui contient le libellé de la question
 * @param {*} question La question elle même de qui on va récupérer l'id
 * @param {*} callBackModify Une callback de modification de question qui prend l'id en param
 * @param {*} callBackRemove Une callback de suppression de question qui prend l'id en param
 */
const baseCreateRowForTable = function ($table, $readFromInput, question, callBackModify, callBackRemove) {
    var buttonModify = createButton(null, 'btn btn-primary m-2', function () {
        callBackModify(question._id);
    });
    var buttonDelete = createButton(null, 'btn btn-danger', function () {
        callBackRemove(question._id);
    })
    // Créer les icôns pour les boutons
    buttonModify.append(createIcon('fa fa-pencil-square-o'));
    buttonDelete.append(createIcon('fa fa-trash'));
    // On tronque le texte si trop grand
    var wording = truncateText($readFromInput.val(), defaultTruncateQuestionText);
    // Construit la ligne
    $table.find('tbody')
        .append($(`<tr id = ${question._id}>`)
            .append($(`<td data-name='question'>`).append(wording))
            .append($('<td>').append(buttonModify).append(buttonDelete))
        )
}

/**
 * Se charge de modifier le libelle de la question
 * Dans un tableau de rendu grâce à l'id de la question
 * @param {*} id L'id de la question
 * @param {*} callBackWording La function permettant d'afficher le nouveau libellé
 */
const baseModifyQuestionInTable = function (id, callBackWording) {
    var tableRow = document.getElementById(id);
    if (tableRow === null)
        return;
    var tableCell = tableRow.querySelector('[data-name]');
    if (tableCell === null)
        return;
    if (typeof callBackWording !== 'function')
        return;
    tableCell.innerHTML = truncateText(callBackWording(id), defaultTruncateQuestionText);;
}

/**
 *  Function de base à invoquer lors de l'ajout d'une question
 * @param {*} validationGroups Se charge de verifier si les inputs sont remplis correctement
 * @param {*} addQuestionFromInputs Se charge de l'ajout d'une question dans la collection depuis les inputs
 * @param {*} createRowForTable Se charge de créer la ligne dans la table. Prend en paramètre une question
 * @param {*} cleanInputs Nettoyage des inputs du formulaire
 * @param {*} messageSuccess Message en cas de succès
 */
const baseClickAddQuestion = function (validationGroups, addQuestionFromInputs, createRowForTable, cleanInputs, messageSuccess) {
    try {
        validationGroups();
        var question = addQuestionFromInputs();
        createRowForTable(question);
        cleanInputs();
        alertify.success(messageSuccess, defaultTimeoutAlertifyMessage);
    } catch (error) {
        alertify.error(error.message);
    }
}

/**
 * Function de base à invoquer lors de la modification d'une question
 * @param {*} callBackModify CallBack de modification de la question
 * @param {*} cleanInputs Nettoyage des inputs du formulaire
 * @param {*} hideShowButtons Masquage affichage des boutons
 * @param {*} messageSuccess  Message en cas de succès
 */
const baseClickRegisterChangesQuestion = function (callBackModify, cleanInputs, hideShowButtons, messageSuccess) {
    try {
        callBackModify();
        cleanInputs();
        hideShowButtons();
        alertify.success(messageSuccess, defaultTimeoutAlertifyMessage);
    } catch (error) {
        alertify.error(error.message);
    }
}

/***************************/
/*          INITS          */
/***************************/

/**
 * Se charge d'initialiser les events de la page
 */
const initEvents = function () {

    /***************************/
    /*         NUGGETS         */
    /***************************/

    /**
     * Se charge d'ajouter une question de type nuggets
     */
    $buttonAddQuestionNuggets.click(function () {
        baseClickAddQuestion(validateInputsNuggets, addNuggetsQuestionFromInputs,
            createRowForTableNuggets, cleanupInputsForNuggets,
            'Question pour les nuggets ajoutée');
    });

    /**
     * Se charge de modifier une question pour les nuggets
     */
    $buttonRegsiterChangesQuestionNuggets.click(function () {
        baseClickRegisterChangesQuestion(callBackModifyNuggetsQuestion, cleanupInputsForNuggets, function () {
            hiddenRegisterCancelChangesQuestionNuggets();
            $buttonAddQuestionNuggets.show();
        }, 'Question pour les nuggets modifiée');
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


    /***************************/
    /*       SEL OU POIVRE     */
    /***************************/

    /**
     * Se charge d'ajouter une question de type sel ou poivre
     */
    $buttonAddQuestionSaltOrPepper.click(function () {
        baseClickAddQuestion(validateInputsSaltOrPepper, addSaltOrPepperQuestionFromInputs,
            createRowForTableSaltOrPepper, cleanupInputsForSaltOrPepper,
            'Question pour le sel ou poivre ajoutée');
    });

    /**
     * Se charge de modifier une question pour les sel ou poivre
     */
    $buttonRegsiterChangesQuestionSp.click(function () {
        baseClickRegisterChangesQuestion(callBackModifySaltOrPepperQuestion, cleanupInputsForSaltOrPepper, function () {
            hiddenRegisterCancelChangesQuestionSp();
            $buttonAddQuestionSaltOrPepper.show();
        }, 'Question pour le sel ou poivre modifiée');
    });

    /**
     * Se charge de nettoyer le formulaire et d'afficher les bons boutons
     * Lorsque l'utilisateur souhaite annuler la modification d'une question
     */
    $buttonCancelChangesQuestionSp.click(function () {
        cleanupInputsForSaltOrPepper();
        hiddenRegisterCancelChangesQuestionSp();
        $buttonAddQuestionSaltOrPepper.show();
    });

    /***************************/
    /*         ADDITION        */
    /***************************/

    $buttonAddQuestionAddition.click(function () {
        baseClickAddQuestion(validateInputsAddition, addAdditionQuestionFromInputs,
            createRowForTableAddition, cleanupInputsForAddition,
            'Question pour les addition ajoutée');
    });

    $buttonRegsiterChangesQuestionAddition.click(function () {
        baseClickRegisterChangesQuestion(callBackModifyAdditionQuestion, cleanupInputsForAddition, function () {
            hiddenRegisterCancelChangesQuestionAddition();
            $buttonAddQuestionAddition.show();
        }, 'Question addition modifiée');
    })

    /**
     * Se charge de nettoyer le formulaire et d'afficher les bons boutons
     * Lorsque l'utilisateur souhaite annuler la modification d'une question
     */
    $buttonCancelChangesQuestionAddition.click(function () {
        cleanupInputsForAddition();
        hiddenRegisterCancelChangesQuestionAddition();
        $buttonAddQuestionAddition.show();
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
    // Addition
    hiddenRegisterCancelChangesQuestionAddition();
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
 * Cache les boutons de modification ou d'annulation
 * Lors de l'édition d'une question addition
 */
const hiddenRegisterCancelChangesQuestionAddition = function () {
    $buttonRegsiterChangesQuestionAddition.hide();
    $buttonCancelChangesQuestionAddition.hide();
}

/**
 * Initialisation de la visibilité des boutons
 */
initVisibilityButtons();

/**
 * Lance l'initialisation des évènements
 */
initEvents();