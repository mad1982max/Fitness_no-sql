const config = require('../config/jwt.config');
const jwt = require('jsonwebtoken');
const MyErrors = require('./error.service');

const expTime = config.auth.tokenExpirationTimeSec;
const secretKey = config.auth.secretKey;

class Token {
    static generateToken(payload) {
        return jwt.sign(payload, secretKey);
    }

    static verifyToken(token) {
        return jwt.verify(token, secretKey, {ver: expTime}, (err, decoded) => {
            if(err) {throw new MyErrors(401, 'Invalid token', 'This token is not valid')}
            else {
                return decoded;
            }
        });
    }
}
module.exports = Token;