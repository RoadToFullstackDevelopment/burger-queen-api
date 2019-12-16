const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    coffee: {
        type: Boolean
    },
    restOfTheDay: {
        type: Boolean
    },
    complement: {
        type: Boolean
    }
});

module.exports = mongoose.model('Product', productSchema);