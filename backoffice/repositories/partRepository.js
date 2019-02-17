const mongoose = require('mongoose');
const Part = require('../models/schema/Part')(mongoose);
/**
 * Couche d'accès aux données des parties
 */
function PartRespository() {
    this.findAll = function (callBackGetResults) {
        Part.find({}, function (err, parts) {
            if (err)
                console.log(err);
            callBackGetResults(parts);
        })
    }
    this.findById = function (id, callBackGetResult) {
        Part.findById(id, function (err, part) {
            if (err)
                console.log(err);
            callBackGetResult(part);
        });
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