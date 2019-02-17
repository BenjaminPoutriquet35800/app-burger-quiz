module.exports = function (mongoose) {

    /**
     * Définie le schéma d'une réponse nuggets
     */
    var responseNuggetsSchema = new mongoose.Schema({
        wording: String,
        isGoodResponse: Boolean
    });
    /**
     * Définie le schéma d'une question nuggets
     */
    var questionNuggetsSchema = new mongoose.Schema({
        wording: String,
        image: String,
        video: String,
        responses: [responseNuggetsSchema]
    });

    var questionOtherSchema = new mongoose.Schema({
        question: String,
        repsonse: String,
        imageQuestion : String
    });

    /**
     * Définie le schéma d'un thématique avec des questions 
     * Ex :
     * theme = 'La Réponse Est Peut-Etre Dans La Question'
     * questions => liste de question / réponse
     */
    var thematicsSchema = new mongoose.Schema({
        theme: String,
        questions: [questionOtherSchema]
    });

    var nuggetsSchema = new mongoose.Schema({
        questions: [questionNuggetsSchema]
    });

    var saltOrPepperSchema = new mongoose.Schema({
        thematic: thematicsSchema
    });

    var menusSchema = new mongoose.Schema({
        thematics: [thematicsSchema]
    });

    var additionSchema = new mongoose.Schema({
        thematic: thematicsSchema
    });

    var deathBurgerSchema = new mongoose.Schema({
        thematic: thematicsSchema
    });

    /**
     * Définie le schéma d'une partie
     */
    var partSchema = new mongoose.Schema({
        title: String,
        description: String,
        isArchive: Boolean,        
        image: String,
        nuggets: nuggetsSchema,
        saltOrPepper: saltOrPepperSchema,
        menus: menusSchema,
        addition: additionSchema,
        deathBurger: deathBurgerSchema
    });
    var Part = mongoose.model('Part', partSchema);
    return Part;
}