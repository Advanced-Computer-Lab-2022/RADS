const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    corpTraineeId: {
        type: mongoose.Types.ObjectId,
        ref: 'corpTraineeModel'
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'courseModel'
    }
})

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
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'ADMIN'
    },
    requests: {
        type: [requestSchema]
    }
}, { timestamps: true })

module.exports = mongoose.model('Admin', adminSchema);