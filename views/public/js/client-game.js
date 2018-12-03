$pointKetchupDecade = $('#point-ketchup-decade');
$pointKetchupUnit = $('#point-ketchup-unit');
$pointMayoDecade = $('#point-mayo-decade');
$pointMayoUnit = $('#point-mayo-unit');

$modalBuzz = $('#modal-buzz');
$mainBackground = $('#game-background');

var socket = null;

const mayo = 'team-mayo'
const ketchup = 'team-ketchup';
const componentsMayo = [];
const componentsKetchup = [];

/**
 * Prop css convention
 */
const baseEmpty = 'empty-';

/**
 * Les messages que reçoit le client
 */
const messageClientMayo = 'point-mayo';
const messageClientKetchup = 'point-ketchup';
const messageToClientReloadPart = 'reload-part';
const messageToClientReceivePoints = 'receive-points-teams';

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
 * Initialise la socket et ecoute les eventuelles messages
 */
const initSocketAndListenEvents = function () {
    socket = io();
    socket.on(messageClientMayo, function (points) {
        attributePointsAtTeam(mayo, points);
    });
    socket.on(messageClientKetchup, function (points) {
        attributePointsAtTeam(ketchup, points);
    });
    socket.on(messageToClientReloadPart, function () {
        attributePointsAtTeam(mayo, 0);
        attributePointsAtTeam(ketchup, 0);
    });
    socket.on(messageToClientReceivePoints, function (pointsMayo, pointsKetchup) {
        attributePointsAtTeam(mayo, pointsMayo);
        attributePointsAtTeam(ketchup, pointsKetchup);
    });
    socket.on('event-buzz',function(teamName) {
        console.log(teamName);

        if(teamName === ketchup) {
            $mainBackground.hide();
            $modalBuzz.hide();
            $modalBuzz.animation({
                background : 'ketchup-color'
            });
            // $modalBuzz.delay(0).fadeIn();
            // $modalBuzz.toggleClass('ketchup-color');
        }
        else if(teamName === mayo) {

        }else{
            console.log('Impossible de faire le buzz car valeur indéterminée : ' + teamName)
        }
    });

    // On souhaite connaitre le nombre de points
    socket.emit(messageClientsNeedPointsInformations);
}

const receiveBuzzAndInteractOnView = function () {

}


registerComponents();

initSocketAndListenEvents();

// $modalBuzz.css({
//     "opacity": "0",
//     "display": "block",
//     "background": "red"
// }).show().animate({
//     opacity: 1
// })