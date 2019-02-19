const fs = require('fs');

module.exports.handleLogger = (req, res, next) => {
    const message = {
        date: new Date().toLocaleString(),
        url: req.url,
        method: req.method
    };
    const fileName = 'queryLog.txt';
    fs.appendFileSync(`./handleLogFiles/${fileName}`, `${JSON.stringify(message)}\n`);
    console.log('******query was logged to log.txt');
    next();
};