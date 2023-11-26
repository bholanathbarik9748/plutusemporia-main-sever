const jwt = require('jsonwebtoken');

// Token Creator
module.exports.createToken = (id) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({ id }, process.env.AuthToken, {
        expiresIn: maxAge
    });
}