const Rec = require('../models/boughtCards.model.js');
const MyErrors = require('../services/error.service.js');

module.exports.showAllRecs = (req, res, next) => {
    Rec
        .find()
        .select({client_id: 1, open_date: 1})
        .populate('cards.card_id', {_id: 0, title: 1, direction: 1, price: 1})
        .lean(true)
        .then(data => {
            if(data.length !==0) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', 'Recs were not found'));
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)))
}

module.exports.getRecById = (req, res, next) => {
    const id = req.params.id;
    Rec
        .findById(id)
        .select({open_date: 1, close_date: 1})
        .populate('client_id', {fullname: 1, age: 1, gender: 1, _id: 0})
        .populate('cards.card_id', {_id: 0, title: 1, direction: 1, price: 1})
        .populate('cards.coach_id', {_id: 0, fullname: 1})
        .lean(true)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', 'Rec was not found with such id'));
            }
        })
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.addRec = (req, res, next) => {
    const {client_id, open_date, close_date, cardsJSON} = req.body;
    let cardsArr = JSON.parse(cardsJSON);
    
    let rec = {
        client_id: client_id,
        open_date: open_date,
        close_date: close_date,
        cards: cardsArr
    }
    Rec
        .create(rec)
        .then(result => res.send(result))
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.updateRec = (req, res, next) => {
    const {client_id, open_date, close_date, cardsJSON} = req.body;
    let cardsArr = JSON.parse(cardsJSON);
    
    let rec = {
        client_id: client_id,
        open_date: open_date,
        close_date: close_date,
        cards: cardsArr
    }
    const id = req.params.id;

    Rec
        .findByIdAndUpdate(id, rec, {new: true})
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', `Rec was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}


module.exports.deleteRec = (req, res, next) => {
    const id = req.params.id;
    Rec
        .findByIdAndRemove(id)
        .then((data) => {
            if(data) {
                res.send(`Rec with id ${id} was removed`);
            } else {
                next(new MyErrors(404, 'Not found', `Rec was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}