const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    psw: {
        type: String, 
        required: true,
        unique: true
    },  
    status: {
        type: String,
        required: true
    },
    refreshToken: [String]    
});

module.exports = mongoose.model('user', UserSchema);

