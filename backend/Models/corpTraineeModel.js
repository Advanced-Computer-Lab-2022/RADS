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

const corpTraineeSchema = new Schema({
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
        unique: true
    },
    gender: {
        type: String,
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
    courses: {
        type: [courseSchema]
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('corpTrainee', corpTraineeSchema);