const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    waiterName: {
        type: String
    },
    clientName: {
        type: String
    },
    orderReady: {
        type: Boolean
    },
    timePreparation: {
        type: Number
    },
    orderServed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Order', orderSchema);