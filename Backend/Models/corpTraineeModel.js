const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const corpTraineeSchema = new Schema({
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
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required:true
    }

}, { timestamps: true })


module.exports = mongoose.model('corpTrainee', corpTraineeSchema);