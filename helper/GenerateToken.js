const randomstring = require('randomstring');

module.exports.generateOTP = () => {
    return randomstring.generate({
        length: 6,
        charset: 'numeric',
    });
}