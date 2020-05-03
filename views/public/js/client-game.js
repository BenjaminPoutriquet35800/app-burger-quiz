$pointKetchupDecade = $('#point-ketchup-decade');
$pointKetchupUnit = $('#point-ketchup-unit');
$pointMayoDecade = $('#point-mayo-decade');
$pointMayoUnit = $('#point-mayo-unit');

$modalBuzz = $('#modal-buzz');
$mainBackground = $('#game-background');

$modalTransition = $('#modal-transition');
$sourceTransition = $('#source-transition');
$videoTransitionContainer = $('#video-transition-container');

$modalTeamMayo = $('#modal-buzz-first-mayo');
$modalTeamKetchup = $('#modal-buzz-first-ketchup');

var socket = null;
/**
 * Variable permettant de savoir quel équipe
 * Aura buzz en première
 */
var teamFirstBuzz = null;

/**
 * Indique si la transition est en cours
 */
let isTransitionRunning = false;

const mayo = 'team-mayo'
const ketchup = 'team-ketchup';
const componentsMayo = [];
const componentsKetchup = [];

/**
 * Couleur
 */
const mayoColor = '#E0C800';
const ketchupColor = '#C71000';

/**
 * Sons
 */
const buzzSound = './sounds/buzz.mp3';
const buzzSoundAie = './sounds/burger-sound-buzz-1.mp3';
const buzzSoundOutch = './sounds/burger-sound-buzz-2.mp3';

/**
 * Prop css convention
 */
const baseEmpty = 'empty-';

/**
 * Base répertoire
 */
const baseDirVideos = './videos/';

/**
 * Les Durées
 */
const durationHiddenModalBuzzFirst = 4000;

/**
 * Les messages que reçoit le client
 */
const messageClientMayo = 'point-mayo';
const messageClientKetchup = 'point-ketchup';
const messageToClientReloadPart = 'reload-part';
const messageToClientReceivePoints = 'receive-points-teams';
const messageToClientReceiveBuzz = 'receive-buzz';
const messageToClientNextTransition = 'receive-next-transition';
const messageToClientReceiveBadResponse = 'receive-buzz-bad-response';

/**
 * Les messages qu'envoie le client
 */
const messageClientsNeedPointsInformations = 'need-information-points';

/**
 * Se charge d'attribuer des points à une equipe
 * @param {*} team L'equipe à qui on va attribuer les points
 * @param {*} points Les points que l'on va attribuer
 */
var attributePointsAtTeam = function (team, points) {
    var digitis = null;
    if (points > 9) {
        digitis = convertPointsAsIndividualDigits(points);
    }
    if (team === ketchup) {
        if (digitis) {
            $pointKetchupDecade.text(digitis[0]);
            $pointKetchupUnit.text(digitis[1]);
        } else {
            $pointKetchupDecade.text(0);
            $pointKetchupUnit.text(points);
        }
    } else if (team === mayo) {
        if (digitis) {
            $pointMayoDecade.text(digitis[0]);
            $pointMayoUnit.text(digitis[1]);
        } else {
            $pointMayoDecade.text(0);
            $pointMayoUnit.text(points);
        }
    } else {
        alert("Impossible d'assigner un point car aucune équipe n'est déterminé");
    }
    // Récupère la collection de composant pour une équipe
    var collection = team === mayo ? componentsMayo : componentsKetchup;
    // Changement de l'aspect visuel
    changeStateBackground(collection, points);
}

/**
 * Se charge de changer l'affichage pour
 * Une équipe par rapport à son nombre de points
 * @param {*} team 
 * @param {*} points Les points que l'on va attribuer
 */
var changeStateBackground = function (collection, points) {
    for (let index = 0; index <= collection.length; index++) {
        const element = collection[index];
        if (!element)
            continue;
        // Récupération des points
        const value = element.getAttribute('data-points');
        if (value > points) {
            // Si jamais le composant est coloré
            // On le remet normal        
            if (!element.className.includes(baseEmpty)) {
                element.className = baseEmpty + element.className;
            }
        } else {
            if (!element.className.includes(baseEmpty))
                continue;
            element.className = element.className.substring(baseEmpty.length);
        }
    }
}

/**
 * Se charge de transformer un nombre 
 * Dans un tableau de nombre individuel
 * @param {*} points Les points a transformer
 */
var convertPointsAsIndividualDigits = function (points) {
    if (!points)
        return null;
    var output = [];
    var pointsToString = points.toString();
    for (let index = 0; index < pointsToString.length; index++) {
        const element = pointsToString.charAt(index);
        output.push(element);
    }
    return output;
}

/**
 * Se charge d'alimenter les difféntes collections
 */
const registerComponents = function () {
    // Enregistrement des composants mayo
    populateCollectionComponents(componentsMayo, mayo);
    // Enregistement des composants ketchup
    populateCollectionComponents(componentsKetchup, ketchup);
}

/**
 * Se charge d'enregistrer dans une collection les composants
 * Pour chaque équipe
 * @param {*} collection La collection à hydrater
 * @param {*} containerId L'id du container parent de l'equipe
 */
const populateCollectionComponents = function (collection, containerId) {
    let container = document.getElementById(containerId);
    let childs = container.querySelectorAll('[data-points]');
    for (let index = 0; index < childs.length; index++) {
        const element = childs[index];
        collection.push(element);
    }
}

/** 
 * Se charge d'interargir avec la vue
 * Affiche un background de buzz différent 
 * Sur l'écran suivant le nom de l'équipe 
 * @param {*} teamName Le nom de l'équipe
 */
const receiveBuzzAndInteractOnView = function (teamName) {
    if (isTransitionRunning)
        return;
    let color = null;
    let sound = null;
    if (teamName === ketchup) {
        color = ketchupColor;
        sound = buzzSoundAie;
    } else if (teamName === mayo) {
        color = mayoColor;
        sound = buzzSoundOutch;
    } else {
        console.log('Impossible de faire le buzz car valeur indéterminée : ' + teamName)
    }
    if (!color)
        return;
    $mainBackground.hide();
    playSound(sound);
    $modalBuzz.show();
    $modalBuzz.fadeIn(0, function () {
        $(this).css('background', color).fadeOut(500, function () {
            $modalBuzz.hide();
            $mainBackground.show();
            pinupTeamBuzzFirstOnView(teamName);
        });
    });
}

/**
 * Affiche une modal pour l'équipe qui aura
 * Buzz en première
 * @param {*} teamName Le nom de l'équipe pour qui on
 *  On souhaite afficher la modal
 */
const pinupTeamBuzzFirstOnView = function (teamName) {
    if (teamFirstBuzz)
        return;
    teamFirstBuzz = teamName;
    // Récupére la modal à afficher par rapport à l'équipe
    let modal = teamName === mayo ? $modalTeamMayo : $modalTeamKetchup;
    modal.show();
    // On fait disparaitre la modal au bout
    // D'une certaine durée
    setTimeout(function () {
        modal.hide();
        teamFirstBuzz = null;
    }, durationHiddenModalBuzzFirst);
}

/**
 * Se charge d'afficher la fenêtre de jeu principal
 * Et de cacher la fenêtre de transition
 */
const showMainBackgroundAndHideTransition = function () {
    $mainBackground.show();
    $modalTransition.hide();
    isTransitionRunning = false;
}

/**
 * Se charge d'afficher une transition à l'écran
 * @param {*} transitionName Le nom de la ressource à afficher
 */
const receiveOrderForTransition = function (transitionName) {
    $mainBackground.hide();
    $modalTransition.show();
    isTransitionRunning = true;
    $sourceTransition.attr('src', baseDirVideos + transitionName);
    $videoTransitionContainer.load();
    $videoTransitionContainer.get(0).play();
    $videoTransitionContainer.on('ended', function () {
        showMainBackgroundAndHideTransition();
    });
}

/**
 * Se charge d'arrête une transition
 */
const stopTransitionNow = function () {
    showMainBackgroundAndHideTransition();
    $videoTransitionContainer.get(0).pause();
    $sourceTransition.attr('src', '');
}

/**
 * Se charge d'envoyer un son
 * Lorsqu'une équipe à mal répondu
 */
const launchBuzzSound = function () {
    playSound(buzzSound);
}

/**
 * Joue un son
 * @param {*} sound le lien du son à jouer
 */
const playSound = function (sound) {
    var audio = new Audio(sound);
    audio.play();
}

/**
 * Se charge d'initialiser le QrCode avec l'url permettant d'accèder à l'url des équipes
 */
const initQrCode = function () {
    const modalPrepareGame = $('#modal-prepare-game');
    const inputUrlToConvert = $('#input-url-to-qr-code');
    const btnEveryBodyReady = $('#button-everybody-ready');
    const canvasElement = document.getElementById('qr-code-canvas');

    // Se charge de fermer la modal de Qr Code
    const closeModal = function () {
        modalPrepareGame.fadeOut('slow', function () {
            modalPrepareGame.remove();

            // Passage en plein écran
            const el = document.documentElement;
            const rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
            rfs.call(el);
        })
    }

    btnEveryBodyReady.click(closeModal);

    // Si aucune url n'est fournie on ne va pas plus loin
    if (inputUrlToConvert.val().trim() === '') {
        canvasElement.remove();
        return;
    }

    // Génération du QrCode
    QRCode.toCanvas(canvasElement, inputUrlToConvert.val());
}

/**
 * Initialise la socket et ecoute les eventuelles messages
 */
const initSocketAndListenEvents = function () {
    socket = io();
    /**
     * Points pour l'équipe mayo
     */
    socket.on(messageClientMayo, function (points) {
        attributePointsAtTeam(mayo, points);
    });
    /**
     * Points pour l'équipe ketchup
     */
    socket.on(messageClientKetchup, function (points) {
        attributePointsAtTeam(ketchup, points);
    });
    /**
     * Rechargement de la partie
     */
    socket.on(messageToClientReloadPart, function () {
        attributePointsAtTeam(mayo, 0);
        attributePointsAtTeam(ketchup, 0);
        stopTransitionNow();
    });
    /**
     * Reception des points des différents équipes
     */
    socket.on(messageToClientReceivePoints, function (pointsMayo, pointsKetchup) {
        attributePointsAtTeam(mayo, pointsMayo);
        attributePointsAtTeam(ketchup, pointsKetchup);
    });
    /**
     * Réception de l'évènement du buzzer
     */
    socket.on(messageToClientReceiveBuzz, function (teamName) {
        receiveBuzzAndInteractOnView(teamName);
    });
    /**
     * Affiche la prochaine transition
     */
    socket.on(messageToClientNextTransition, function (transitionName) {
        receiveOrderForTransition(transitionName);
    });
    socket.on(messageToClientReceiveBadResponse, function () {
        launchBuzzSound();
    });
    /**
     * On souhaite connaitre le nombre de points
     * Dès que l'on se connecte sur la page
     */
    socket.emit(messageClientsNeedPointsInformations);
}

registerComponents();

initSocketAndListenEvents();

initQrCode();