/**
 * Entité équipe
 */
function Team(name) {
    this.points = 0;
    this.name = name;
    /**
     * Incrémente les points de l'équipe
     */
    this.incrementPoints = function () {
        if (this.points >= 25)
            return;
        this.points++;
    }
    /**
     * décrémente les points de l'équipe
     */
    this.decrementPoints = function () {
        if (this.points <= 0)
            return;
        this.points--;
    }
}

module.exports = Team;