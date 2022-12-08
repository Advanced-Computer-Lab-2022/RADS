const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const courseSchema = new Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'courseModel',
    },
    courseGrade: {
        type: Number
    }
})

const traineeSchema = new Schema({
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    courses: {
        type: [courseSchema]
    }

}, { timestamps: true })

module.exports = mongoose.model('Trainee', traineeSchema);