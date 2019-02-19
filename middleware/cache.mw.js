const redis = require('../config/redis.config');
const MyErrors = require('../services/error.service.js');

redis.on('connect', function() {
    console.log('Redis client connected');
});

redis.on('error', function (err) {
    throw new MyErrors(500, 'Redis error', err.message);
});

module.exports.cache = (req, res, next) => {
    if(!req.query.name) {
        next();
    } else {
        const key  = `/name=${req.query.name}`;
        
        redis.get(key, (err, data) => {
            if(err) next(new MyErrors(500, 'Server error', 'Internal server error (Redis)'));
            if(data !== null) {
                console.log('-------get DATA from cache');
                res.setHeader('content-type', 'application/json');
                res.send(data);
            } else {
                next();
            }
        })
    }
}