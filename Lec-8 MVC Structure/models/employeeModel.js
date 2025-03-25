const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobby: {
        type: Array,
        required: true,
    },
    city: {
        type: String,
        required: true,
    }
});

const emp = mongoose.model('Employees', empSchema);

module.exports = emp;