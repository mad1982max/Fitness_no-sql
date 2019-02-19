const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true},
    exArr: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ex'
        }
    ],
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    coach_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coach'
    }
});

module.exports = mongoose.model('plan', PlanSchema);
