module.exports = function (mongoose) {
    /**
     * Définie le schéma d'une réponse
     */
    var responseSchema = new mongoose.Schema({
        wording: String,
        isGoodResponse: Boolean
    });
    /**
     * Définie le schéma d'une question
     */
    var questionSchema = new mongoose.Schema({
        type: String,
        wording: String,
        image: String,
        video: String,
        responses: [responseSchema]
    });
    /**
     * Définie le schéma d'une partie
     */
    var partSchema = new mongoose.Schema({
        title: String,
        description: String,
        isArchive: Boolean,
        image: String,
        questions: [questionSchema]
    });
    var Part = mongoose.model('Part', partSchema);
    return Part;
}