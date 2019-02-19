const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoachSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 20,
        required: true
    },
    gender: String,
    education: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mail: String,
    achievement: {
        max_points: Number
    }
});

CoachSchema.index({fullname: 1, phone: 1}, {unique: true}); //index

module.exports = mongoose.model('coach', CoachSchema);