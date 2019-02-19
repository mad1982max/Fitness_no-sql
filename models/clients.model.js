const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    fullname: {
        type: String, 
        required: true
    },
    age: {
        type: Number,
        min: 16,
        required: true
    },
    gender: String,
    phone: {
        type: String,
        required: true
    },
    address: String,
    mail: String,
    achievements: {
        weight: Number,
        weist: Number,
        max_points: Number}
});

ClientSchema.index({fullname: 1, phone: 1}, {unique: true}); //index

module.exports = mongoose.model('client', ClientSchema);