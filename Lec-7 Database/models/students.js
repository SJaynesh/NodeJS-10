const mongoose = require('mongoose');

// MongoDB Schema
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

// MongoDB Model
const student = mongoose.model('students', studentSchema);

module.exports = student;