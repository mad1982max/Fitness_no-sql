const Cards = require('../models/cards.model.js');
const MyErrors = require('../services/error.service.js');

module.exports.showAllCards = (req, res, next) => {
    Cards
        .find({}, {title: 1, direction: 1, price: 1})
        .lean(true)
        .then(data => {
            if(data.length !==0) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', 'Cards were not found'));
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)))
}

module.exports.getCardById = (req, res, next) => {
    const id = req.params.id;
    Cards
        .findById(id)
        .select({title: 1, direction: 1, price: 1, terms: 1})
        .lean(true)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', 'Card was not found'))
            }
        })
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.addCard = (req, res, next) => {
    const {title, direction, price, terms} = req.body;
    const card = {
        title, direction, price, terms
    }
    Cards
        .create(card)
        .lean(true)
        .then(result => res.send(result))
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.updateCard = (req, res, next) => {
    const {title, direction, price, terms} = req.body;
    const card = {
        title, direction, price, terms
    }
    const id = req.params.id;

    Cards
        .findByIdAndUpdate(id, card, {new: true})
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', `Card was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}

module.exports.deleteCard = (req, res, next) => {
    const id = req.params.id;
    Cards
        .findByIdAndRemove(id)
        .then((data) => {
            if(data) {
                res.send(`Card with id ${id} was removed`);
            } else {
                next(new MyErrors(404, 'Not found', `Card was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}
