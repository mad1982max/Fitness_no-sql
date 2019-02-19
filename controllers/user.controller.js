const User = require('../models/user.model.js');
const MyErrors = require('../services/error.service.js');
const Token = require('../services/jwt.service');
const bcrypt = require('bcrypt');

const config = require('../config/jwt.config');
// module.exports.addUser = (req, res, next) => {
//     const {name, psw, status} = req.body;

//     bcrypt.hash(psw, 10, (err, hash) => {
//         if(err) next(new MyErrors(400, err.name, err.message));
//         const user = {name, status};
//         user.psw = hash;

//         User
//         .create(user)
//         .then(result => res.send(result))
//         .catch(err => next(new MyErrors(400, err.name, err.message)));
//     })
// }


module.exports.authenticate = (req, res, next) => 
    User
        .findOne({name: req.body.name})
        .then(user => {
            //console.log(user);
            if(!user) {
                next(new MyErrors(404, 'Not found', 'Authentication failed. User not found'));
            } else {
                bcrypt.compare(req.body.psw, user.psw, (err, result) => {
                    if(err) next(new MyErrors(400, err.name, err.message));
                    if(result) {
                        const accessTokenExp = Math.floor(Date.now()/1000) + config.auth.accessTokenLifeMin;
                        const refreshTokenExp = Math.floor(Date.now()/1000) + config.auth.refreshTokenLifeHour;

                        const payloadAccessToken = {};
                        payloadAccessToken.status = user.status;
                        payloadAccessToken.exp = accessTokenExp;

                        const payloadRefreshToken = {};
                        payloadRefreshToken.status = user.status;
                        payloadRefreshToken.exp = refreshTokenExp;
                        payloadRefreshToken._id = user._id;

                        const accessToken = Token.generateToken(payloadAccessToken);
                        const refreshToken = Token.generateToken(payloadRefreshToken);
                        
                        User
                            .findByIdAndUpdate(user._id, {$push: {refreshToken: refreshToken}}, { 'new': true})
                            .then(user => console.log(user));

                        const answer = {};
                        answer._id = result._id;
                        answer.accessToken = accessToken;
                        answer.refreshToken = refreshToken;
                        answer.accessTokenExp = accessTokenExp;


                        res.json(answer);
                    } else {
                        next(new MyErrors(404, 'Not found', 'Authentication failed. Wrong password'));
                    }
                })
            }
        })
        .catch(err => next(new MyErrors(400, err.name, err.message)));
