const mongoose = require('mongoose');

function MongoDbHelper() {
  const connectedState = 1;
  const connectingState = 2;
  this.mongoose = mongoose;
  /**
   * Se charge de vérifier si on est connecter
   * A la base de données MongoDb
   */
  this.isMongoDbAvailable = function () {
    let mongooseState = this.mongoose.connection.readyState;
    return (mongooseState == connectedState) ||
      (mongooseState == connectingState);
  }

  /**
   * Se charge d'obtenir l'instance de mongoose
   * NOTA : mongoose est un singleton
   */
  this.getMongooseInstance = function () {
    return this.mongoose;
  }

  /**
   * Se connecter au serveur MongoDb
   */
  this.connectToServer = function (serverUri, options, callBackOnSuccess, callBackOnError) {
    this.mongoose.connect(serverUri, {
      useNewUrlParser: true
    }).then(
      () => {
        if (!typeof callBackOnSuccess === 'function' ||
          callBackOnSuccess === undefined)
          return;
        callBackOnSuccess();
      },
      err => {
        if (!typeof callBackOnError === 'function' ||
          callBackOnError === undefined)
          return;
        callBackOnError(err);
      }
    );
  }

  /**
   * Désactive la mise en mémoire tampon
   * Permet lors d'une requête si une connexion n'est pas établie
   * De ne pas attendre et de lever une exception
   */
  this.disabledBufferCommands = function () {
    mongoose.set('bufferCommands', false);
  }



}

module.exports = MongoDbHelper;