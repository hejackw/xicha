const mongoose = require('mongoose');

const shema = new mongoose.Schema({
    tel: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', shema);

module.exports = User;