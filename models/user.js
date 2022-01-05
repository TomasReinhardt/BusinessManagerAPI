const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    user: {
        type: String,
        require: true,
        min: 3,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 1024
    },
    tok: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema);