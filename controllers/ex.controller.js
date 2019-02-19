const Ex = require('../models/ex.model.js');
const MyErrors = require('../services/error.service.js');

module.exports.showAllEx = (req, res, next) => {
    Ex
        .find()
        .lean(true)
        .then(data => {
            if(data.length !==0) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', 'Exs were not found'));
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)))
}


module.exports.getExById = (req, res, next) => {
    const id = req.params.id;
    
    Ex
        .findById(id)
        .select({title: 1, description: 1})
        .lean(true)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', 'Ex was not found'))
            }
        })
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.addEx = (req, res, next) => {
    const {title, description} = req.body;
    const ex = {title, description};

    Ex
        .create(ex)
        .then(result => res.send(result))
        .catch(err => next(new MyErrors(400, err.name, err.message)));
}

module.exports.updateEx = (req, res, next) => {
    const {title, description} = req.body;
    const ex = {title, description};
    const id = req.params.id;

    Ex
        .findByIdAndUpdate(id, ex, {new: true})
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                next(new MyErrors(404, 'Not found', `Ex was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}


module.exports.deleteEx = (req, res, next) => {
    const id = req.params.id;
    Ex
        .findByIdAndRemove(id)
        .then((data) => {
            if(data) {
                res.send(`Ex with id ${id} was removed`);
            } else {
                next(new MyErrors(404, 'Not found', `Ex was not found with id: ${id}`))
            }
        })
        .catch(err => next(new MyErrors(500, err.name, err.message)));
}