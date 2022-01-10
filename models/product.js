const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cant: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Product',productSchema);