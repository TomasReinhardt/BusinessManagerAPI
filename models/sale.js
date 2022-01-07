const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    total: {
        type: Number,
        require: true
    },
    listProducts: {
        type: Array,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    fiado: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model('Sale', saleSchema);