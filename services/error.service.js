const fs = require('fs');

class MyErrors extends Error {
    constructor(status, name, message) {
        super(message);
        this.status = status;
        this.name = name;
    }

    static error404 (req, res, next) {
        next(new MyErrors(404, 'Page not found', 'Such page was not found in your system'));
    }

    static errorLogger(err, req, res, next) {
        const message = {
            date: new Date().toLocaleString(),
            name: err.name,
            message: err.message,
            status: err.status
        };
        
        const fileName = 'errLog.txt';
        fs.appendFileSync(`./handleLogFiles/${fileName}`, `${JSON.stringify(message)}\n`);
        console.log('------- handleErrorLogger', message.status, message.name, message.date);
        next(err);
    }

    static errorHandler(err, req, res, next) {
        res.json(
            {
                name: err.name,
                message: err.message,
                status: err.status
            }
        );
    }
}

module.exports = MyErrors;