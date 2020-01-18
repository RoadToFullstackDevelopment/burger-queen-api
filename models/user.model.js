const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        unique: true,
        required: true,
        min: 6
    },
    kitchen: {
      type: Boolean
    },
    salon: {
      type: Boolean
    }
});

module.exports = mongoose.model('User', userSchema);