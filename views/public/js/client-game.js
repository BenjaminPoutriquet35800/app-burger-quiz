$pointKetchupDecade = $('#point-ketchup-decade');
$pointKetchupUnit = $('#point-ketchup-unit');
$pointMayoDecade = $('#point-mayo-decade');
$pointMayoUnit = $('#point-mayo-unit');

$modalBuzz = $('#modal-buzz');
$mainBackground = $('#game-background');

$modalTransition = $('#modal-transiton');
$sourceTransition = $('#source-transition');
$videoTransitionContainer = $('#video-transition-container');

var socket = null;

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
 * Prop css convention
 */
const baseEmpty = 'empty-';

/**
 * Base répertoire
 */
const baseDirVideos = './videos/';

/**
 * Les messages que reçoit le client
 */
const messageClientMayo = 'point-mayo';
const messageClientKetchup = 'point-ketchup';
const messageToClientReloadPart = 'reload-part';
const messageToClientReceivePoints = 'receive-points-teams';
const messageToClientReceiveBuzz = 'receive-buzz';
const messageToClientNextTransition = 'receive-next-transition';

/**
 * Les messages qu'envoie le client
 */
const messageClientsNeedPointsInformations = 'need-information-points';

/**
 * Se charge d'attribuer des points à une equipe
 * @param {*} team L'equipe à qui on va attribuer le point
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
    let color = null;
    if (teamName === ketchup) {
        color = ketchupColor;
    } else if (teamName === mayo) {
        color = mayoColor;
    } else {
        console.log('Impossible de faire le buzz car valeur indéterminée : ' + teamName)
    }
    if (!color)
        return;
    $mainBackground.hide();
    $modalBuzz.show();
    $modalBuzz.fadeIn(0, function () {
        $(this).css('background', color).fadeOut(500, function () {
            $modalBuzz.hide();
            $mainBackground.show();
        });
    });
}

/**
 * Se charge d'afficher une transition à l'écran
 * @param {*} transitionName Le nom de la ressource à afficher
 */
const receiveOrderForTransition = function (transitionName) {
    $mainBackground.hide();
    $modalTransition.show();
    $sourceTransition.attr('src', baseDirVideos + transitionName);
    $videoTransitionContainer.load();
    $videoTransitionContainer.get(0).play();
    $videoTransitionContainer.on('ended', function () {
        $mainBackground.show();
        $modalTransition.hide();
    });
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
    })
    /**
     * On souhaite connaitre le nombre de points
     * Dès que l'on se connecte sur la page
     */
    socket.emit(messageClientsNeedPointsInformations);
}

registerComponents();

initSocketAndListenEvents();