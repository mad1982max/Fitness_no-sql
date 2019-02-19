const fs = require('fs');

module.exports = {
    key: fs.readFileSync( './ssl/localhost.key' ),
    cert: fs.readFileSync( './ssl/localhost.cert' ),
    requestCert: false,
    rejectUnauthorized: false
}