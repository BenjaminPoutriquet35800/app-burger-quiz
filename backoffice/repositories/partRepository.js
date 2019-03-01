const mongoose = require('mongoose');
const Part = require('../models/schema/Part')(mongoose);
/**
 * Couche d'accès aux données des parties
 */
function PartRespository() {
    /**
     * Récupère toutes les parties
     */
    this.findAll = async function (callBackGetResults) {
        Part.find({}).exec().then(function (parts) {
            callBackGetResults(null, parts);
        }).catch(function (error) {
            callBackGetResults(error, []);
        })
    }
    /**
     * Recherche une partie grâce à son id
     */
    this.findById = function (id, callBackGetResult) {
        Part.findById(id).exec().then(function(part){
            callBackGetResult(null, part);
        }).catch(function(error){
            callBackGetResult(error, null);
        })
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