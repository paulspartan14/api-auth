const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100 
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 100 
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 100 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);