const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    }

}, { timestamps: true })


module.exports = mongoose.model('Admin', adminSchema);
