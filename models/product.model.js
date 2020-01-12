const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    kindOfProduct: {
        type: String
    },
    complement: {
        type: Boolean
    }
});

module.exports = mongoose.model('Product', productSchema);