const Coaches = require('../models/coaches.model.js');
const MyErrors = require('../services/error.service.js');
const redis = require('../config/redis.config');
//const { body } = require('express-validator/check');

module.exports.showAllCoaches = (req, res, next) => {
    if(req.query.name) {
        const regex = req.query.name;
        Coaches
            .find({fullname: {$regex: `^${regex}`, $options: 'i'}})
            .select('fullname age gender education')
            .sort({fullname: 1})
            .lean(true)
            .then(data => {
                if(data.length !== 0) {
                    res.send(data);
                } else {
                    next(new MyErrors(404, 'Not found', 'Coaches were not found with such name'))
                }
            })
            .catch(err => next(new MyErrors(500, err.name, err.message)))

    } else if(req.query.age && req.query.bigger) {
        let finderCond = req.query.bigger === 'true'? "$gte": "$lte";
        Coaches
            .find({age: {[finderCond] : req.query.age}})
            .select({__v: 0})
            .sort({fullname: 1})
            .lean(true)
            .then(data => res.send(data))
            .catch(err => next(new MyErrors(500, err.name, err.message)))
              
    } else {
        Coaches
            .find()
            .lean(true)
            .select({fullname: 1, age: 1, gender: 1, education: 1})
            .then(data => {
                res.send(data);
            })
            .catch(err => next(new MyErrors(500, err.name, err.message)))
    }
}

module.exports.getCoachById = (req, res, next) => {
    const id = req.params.id;
    Coaches
        .findById(id)
        .select({fullname: 1, gender: 1, phone: 1, address: 1, achievements: 1, mail: 1})
        .lean(true)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', 'Coach was not found'))
            }
        })
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.addCoach = (req, res, next) => {
    const {fullname, age, gender, education,  phone, mail, address, max_points} = req.body;
    
    const achievements = {};
    achievements.max_points = max_points;

    const coach = {
        fullname, age, gender, education, phone, mail, address, achievements
    }

    Coaches
        .create(coach)
        .then(data => res.send(data))
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.updateCoach = (req, res, next) => {
    const {fullname, age, gender, education,  phone, mail, address, max_points} = req.body;
    const achievements = {};
    achievements.max_points = max_points;

    const coach = {
        fullname, age, gender, education, phone, mail, address, achievements
    }

    const id = req.params.id;
    Coaches
        .findByIdAndUpdate(id, coach, {new: true})
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', `Coach was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}

module.exports.deleteCoach = (req, res, next) => {
    const id = req.params.id;
    Coaches
        .findByIdAndRemove(id)
        .then((data) => {
            if(data) {
                res.send(`Coach with id ${id} was removed`);
            } else {
                next(new MyErrors(404, 'Not found', `Coach was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}