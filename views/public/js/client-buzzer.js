$buzzButton = $('#buzz-button');
$inputHiddenTeam = $('#team-hf-val');

var socket = null;

/**
 * Les messages qu'envoie le client
 */
const messageClientSendBuzz = 'on-buzz';

/**
 * Initialise les events
 */
const initEvents = function () {
    $buzzButton.click(function () {
        let teamName = $inputHiddenTeam.val();
        socket.emit(messageClientSendBuzz, teamName);
    });
}

/**
 * Initialise la socket et ecoute les eventuelles messages
 */
const initSocketAndListenEvents = function () {
    socket = io();
}

initSocketAndListenEvents();

initEvents();