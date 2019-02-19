const redis = require('redis');
module.exports = redis.createClient({
    host: 'redis'
    // host: '120.0.0.1'
});