const Plan = require('../models/plan.model.js');
const MyErrors = require('../services/error.service.js');


module.exports.showAllPlans = (req, res, next) => {
    Plan.find().then(result => res.send(result));
}

module.exports.getPlanById = (req, res, next) => {
    const id = req.params.id;
    
    Plan
    .findById(id)
    .select({open_date: 1})
    .populate('client_id', {fullname: 1, age: 1, gender: 1, _id: 0})
    .populate('cards.card_id', {_id: 0, title: 1, direction: 1, price: 1})
    .populate('cards.coach_id', {_id: 0, fullname: 1})
    .lean(true)
    .exec((err, data) => res.send(data))
}

module.exports.addPlan = (req, res, next) => {
    
    // Plan.create(arr).then(result => res.send(result));
}