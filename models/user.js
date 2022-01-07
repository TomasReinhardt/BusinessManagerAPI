const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 255
    },
    username: {
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
    }
})

module.exports = mongoose.model('User', userSchema);