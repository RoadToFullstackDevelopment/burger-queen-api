const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String
    },
    kindOfProduct: {
        type: String
    },
    complement: {
        type: Boolean
    }
});

module.exports = mongoose.model('Product', productSchema);