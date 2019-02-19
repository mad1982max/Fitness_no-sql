const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoughtCardSchema = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'client'
    },
    open_date: {
        type: Date,
        required: true
    },
    close_date: {
        type: Date,
        required: true
    },
    cards: [{
        card_id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'card'
        },
        coach_id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coach'
        }
    }]
});

module.exports = mongoose.model('boughtCard', BoughtCardSchema);