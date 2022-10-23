const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    }

}, { timestamps: true })


module.exports = mongoose.model('Instructor', instructorSchema);

//Instructor.find()