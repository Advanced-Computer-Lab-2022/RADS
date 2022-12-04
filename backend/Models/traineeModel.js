const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = mongoose.Schema({
    excerciseId: {
        type: Number
    },
    grade: {
        type: Number
    }
});

const courseSchema = new Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'courseModel',
    },
    exerciseGrades: {
        type: [exerciseSchema]
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
    courses: {
        type: [courseSchema]
    }

}, { timestamps: true })

module.exports = mongoose.model('Trainee', traineeSchema);