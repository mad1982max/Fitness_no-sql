const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    terms: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('card', CardSchema);