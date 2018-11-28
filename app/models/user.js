var bcrypt  = require('bcrypt-nodejs');

function User() {
    this.login = null;
    this.password = null;
    this.pseudonym = null;
    /**
     * Se charge de vérifier si le password est valide
     */
    this.validPassword = function (password) {
        if (!this.password || !password) {
            return false;
        }
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = User;