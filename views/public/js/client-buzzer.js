$buzzButton = $('#buzz-button');
$inputHiddenTeam = $('#team-hf-val');

var socket = null;

/**
 * Les messages que reçoit le client
 */
const messageToClientLockBuzz = 'receive-lock-buzz';
const messageToClientUnLockBuzz = 'receive-unlock-buzz';

/**
 * Les messages qu'envoie le client
 */
const messageClientSendBuzz = 'on-buzz';

/**
 * Les styles css
 */
const lockBuzzerStyle = 'lock-buzz-button';


/**
 * Initialise les events
 */
const initEvents = function () {
    let teamName = $inputHiddenTeam.val();
    // Par défaut on bloque le bouton au démarrage
    $buzzButton.addClass(lockBuzzerStyle);
    $buzzButton.click(function () {
        // Si le bouton est bloqué on emet rien
        if ($(this).hasClass(lockBuzzerStyle))
            return;
        socket.emit(messageClientSendBuzz, teamName);
    });
}

/**
 * Initialise la socket et ecoute les eventuelles messages
 */
const initSocketAndListenEvents = function () {
    socket = io();
    /**
     * Bloquer le buzzer
     */
    socket.on(messageToClientLockBuzz, function () {
        $buzzButton.addClass(lockBuzzerStyle);
    });
    /**
     * Bloquer le buzzer
     */
    socket.on(messageToClientUnLockBuzz, function () {
        $buzzButton.removeClass(lockBuzzerStyle);
    });
}

initSocketAndListenEvents();

initEvents();