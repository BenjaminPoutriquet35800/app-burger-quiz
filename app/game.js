module.exports = function (io) {
    const Team = require('../app/models/Team');
    const Transition = require('../app/models/Transition');
    const messages = require('../config/messages-socket');
    
    let transitionsList = [];

    const teamMayo = new Team('mayo');
    const teamKetchup = new Team('ketchup');
    /**
     * Etat du buzzer
     */
    var buzzerIsLock = true;

    const initGameSocket = function () {
        /**
         * Init Socket
         */
        io.on(messages.messageConnection, function (socket) {
            /**
             *  Se produit lors d'une déconnexion utilisateur
             */
            socket.on(messages.messageDisconnected, function () {});
            /**
             *  On emet dès que le client se connecte et demande l'info des points
             */
            socket.on(messages.messageClientsNeedPointsInformations, function () {
                io.emit(messages.messageToClientReceivePoints, teamMayo.points, teamKetchup.points);
            });
            socket.on(messages.messageClientNeedStateBuzzer, function () {
                io.emit(messages.messageToClientReceiveStateBuzzer, buzzerIsLock);
            });
            /**
             *  Manage les points de la team mayo
             */
            socket.on(messages.messageMayoTeam, function (message) {
                receiveOrderModifyPoints(message, messages.messageToClientMayo, teamMayo);
            });
            /**
             *  Manage les points de la team ketchup
             */
            socket.on(messages.messageKetchupTeam, function (message) {
                receiveOrderModifyPoints(message, messages.messageToClientKetchup, teamKetchup);
            });
            /**
             * Se charge de bloquer les buzzers 
             */
            socket.on(messages.messageLockBuzz, function () {
                buzzerIsLock = true;
                io.emit(messages.messageToClientLockBuzz)
            });
            /**
             * Se charge de débloquer les buzzers 
             */
            socket.on(messages.messageUnLockBuzz, function () {
                buzzerIsLock = false;
                io.emit(messages.messageToClientUnLockBuzz)
            });
            /**
             * Recharge la partie
             */
            socket.on(messages.messageReloadPart, function () {
                buzzerIsLock = true;
                teamMayo.points = 0;
                teamKetchup.points = 0;
                initTransitionList();
                io.emit(messages.messageToClientReloadPart);
            });
            /**
             * Se produit lorsqu'un client buzz
             */
            socket.on(messages.messageClientSendBuzz, function (teamName) {
                if (buzzerIsLock)
                    return;
                io.emit(messages.messageToClientReceiveBuzz, teamName);
            });

            /**
             * Se charge d'envoyer la prochaine transition
             */
            socket.on(messages.messageNextTransition, function () {
                var nextTransition = transitionsList.shift();
                if (!nextTransition)
                    return;
                io.emit(messages.messageToClientNextTransition, nextTransition.filename);
            });

            /**
             * Se charge d'ajouter ou de retirer des points
             * Pour une équipe
             */
            const receiveOrderModifyPoints = function (messageReceive, messageForClient, team) {
                if (messageReceive === messages.messageAdd) {
                    team.incrementPoints();
                } else {
                    team.decrementPoints()
                }
                io.emit(messageForClient, team.points);
            }
        });
    }

    /**
     * Se charge d'initialiser les transitions
     */
    const initTransitionList = function () {
        transitionsList = [];
        transitionsList.push(new Transition('nuggets-transition.mp4', 1));
        transitionsList.push(new Transition('selt-pepper-transition.mp4', 2));
        transitionsList.push(new Transition('menus-transition.mp4', 3));
        transitionsList.push(new Transition('death-burger-transition.mp4', 4));
        // Tri sur la propriété ordre de manière asc
        transitionsList.sort(function (a, b) {
            return a.order - b.order;
        });
    }

    // Init de la socket
    initGameSocket();
    // On initialise la liste dès le début
    initTransitionList();
}