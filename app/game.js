module.exports = function (io) {
    const Team = require('../app/models/Team');
    const messages = require('../config/messages-socket');

    const teamMayo = new Team('mayo');
    const teamKetchup = new Team('ketchup');

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
            io.emit(messages.messageToClientLockBuzz)
        });
        /**
         * Se charge de débloquer les buzzers 
         */
        socket.on(messages.messageUnLockBuzz, function () {
            io.emit(messages.messageToClientUnLockBuzz)
        });
        /**
         * Recharge la partie
         */
        socket.on(messages.messageReloadPart, function () {
            teamMayo.points = 0;
            teamKetchup.points = 0;
            io.emit(messages.messageToClientReloadPart);
        })
        /**
         * Se produit lorsqu'un client buzz
         */
        socket.on(messages.messageClientSendBuzz, function (teamName) {
            io.emit(messages.messageToClientReceiveBuzz, teamName);
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