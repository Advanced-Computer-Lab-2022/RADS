const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('Instructor', instructorSchema);