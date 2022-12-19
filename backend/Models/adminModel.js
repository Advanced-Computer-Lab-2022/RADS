const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Admin', adminSchema);