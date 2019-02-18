const mongoose = require('mongoose');
const Part = require('../models/schema/Part')(mongoose);
/**
 * Couche d'accès aux données des parties
 */
function PartRespository() {
    /**
     * Récupère toutes les parties
     */
    this.findAll = function (callBackGetResults) {
        Part.find({}, function (err, parts) {
            callBackGetResults(err, parts);
        }).orFail(callBackGetResults(new Error(`Impossible d'accèder aux parties pour le moment`), []));
    }
    /**
     * Recherche une partie grâce à son id
     */
    this.findById = function (id, callBackGetResult) {
        Part.findById(id, function (err, part) {
            callBackGetResult(err, part);
        }).orFail(callBackGetResult(new Error(`Impossible d'accèder à cette partie ${id} pour le moment`), {}));
    }
    /**
     * Se charge de sauvegarder une partie
     * Dans la base de données
     */
    this.savePart = function (part, throwIfError) {
        part.save(function (error) {
            if (!error)
                return;
            if (throwIfError)
                throw error;
        })
    }
}

module.exports = PartRespository;