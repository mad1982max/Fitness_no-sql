const Token = require('../services/jwt.service');
const MyErrors = require('../services/error.service');

// module.exports.verifyAccesToken = (req, res, next) => {
//     if (1544397652 - Date.now()/1000 > 0) { // how?
//         console.log(1544397652 - Date.now()/1000);
//         console.log('fresh');

//     } else {
//         console.log('not fresh. need refresh');

//     }
//     next();
// }

module.exports.verifAdmin = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const answer = Token.verifyToken(token);
    console.log(answer);
    if(answer.status === 'admin') {
        next();
    } else {
        next(new MyErrors(401, 'Invalid token', 'You don\'t have enough rights' ))
    }
};
