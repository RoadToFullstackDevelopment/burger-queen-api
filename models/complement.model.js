const mongoose = require('mongoose');

const complementSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    price: {
        type: Number
    },
    complement: {
        type: Boolean
    }
});

module.exports = mongoose.model('Complement', complementSchema);