const Clients = require('../models/clients.model.js');
const MyErrors = require('../services/error.service.js');
const redis = require('../config/redis.config');

module.exports.showAllClients = (req, res, next) => {
    const skip = +req.query.skip || 0;
    const limit = +req.query.limit || 100;

    if(req.query.name) {
        const regex = req.query.name;

        Clients
            .find({fullname: {$regex: `^${regex}`, $options: 'i'}})
            .limit(limit)
            .select('_id fullname gender address achievements.max_points')
            .sort({fullname: 1})
            .lean(true)
            .then(data => {
                if(data.length !==0) {
                    let key  = `/name=${req.query.name}`;
                    redis.setex(key, 60, JSON.stringify(data)); //REDIS
                    console.log('---------Data was cached');
                    res.send(data);
                } else {
                    next(new MyErrors(404, 'Not found', 'Clients were not found with such name'));
                }
            })
            .catch(err => next(new MyErrors(500, err.name, err.message)))

    } else if(req.query.age && req.query.bigger) {
        let finderCond = req.query.bigger === 'true'? "$gte": "$lte";
        Clients
            .find({age: {[finderCond] : req.query.age}})
            .sort({fullname: 1})
            .lean(true)
            .then(data => res.send(data))
            .catch(err => next(new MyErrors(500, err.name, err.message)))
              
    } else {
        Clients
            .find()
            .lean(true)
            .skip(skip)
            .limit(limit)
            .select({fullname: 1, age:1, gender: 1, achievements: 1})
            .then(data => {
                res.send(data);
            })
            .catch(err => next(new MyErrors(500, err.name, err.message)))
    }
}

module.exports.getClientById = (req, res, next) => {
    const id = req.params.id;
    Clients
        .findById(id)
        .select({fullname: 1, gender: 1, phone: 1, address: 1, achievements: 1, mail: 1})
        .lean(true)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', 'Client was not found with such id'));
            }
        })
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.addClient = (req, res, next) => {
    const {fullname, age, gender, phone, mail, address, weist, weight, max_points} = req.body;
    
    const achievements = {};
    achievements.weist = weist;
    achievements.weight = weight;
    achievements.max_points = max_points;

    const user = {
        fullname, age, gender, phone, mail, address, achievements
    }

    Clients
        .create(user)
        .then(result => res.send(result))
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.updateClient = (req, res, next) => {
    const {fullname, age, gender, phone, mail, address, weist, weight, max_points} = req.body;
    const achievements = {};
    achievements.weist = weist;
    achievements.weight = weight;
    achievements.max_points = max_points;

    const user = {
        fullname, age, gender, phone, mail, address, achievements
    }
    const id = req.params.id;
    Clients
        .findByIdAndUpdate(id, user, {new: true})
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', `Client was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}

module.exports.deleteClient = (req, res, next) => {
    const id = req.params.id;
    Clients
        .findByIdAndRemove(id)
        .then((data) => {
            if(data) {
                res.send(`Client with id ${id} was removed`);
            } else {
                next(new MyErrors(404, 'Not found', `Client was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}
