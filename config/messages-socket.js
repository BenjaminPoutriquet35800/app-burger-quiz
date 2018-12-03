module.exports = Object.freeze({
    /**
     * Messages de base de socket.io
     */    
    messageConnection: 'connection',
    messageDisconnected: 'disconnect',      
    /**
     * Message de la télécommand admin
     * Pour intérargir avec le jeu
     */
    messageAdd: 'add',
    messageReloadPart: 'event-reload-part',
    messageMayoTeam: 'event-point-mayo',
    messageKetchupTeam: 'event-point-ketchup',
    /**
     * Les messages que les clients envoies
     */
    messageClientSendBuzz:'on-buzz',
    messageClientsNeedPointsInformations: 'need-information-points',
    /**
     * Les messages à envoyer aux clients
     */
    messageToClientReloadPart: 'reload-part',
    messageToClientMayo: 'point-mayo',
    messageToClientKetchup: 'point-ketchup',
    messageToClientReceivePoints: 'receive-points-teams',
    messageToClientReceiveBuzz: 'receive-buzz',
});