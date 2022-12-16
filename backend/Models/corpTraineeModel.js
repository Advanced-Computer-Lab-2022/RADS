const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'courseModel',
    },
    exercisesGrade: {
        type: Number,
        default: 0
    },
    solvedExercises: {
        type: Boolean,
        default: false
    },
    examGrade: {
        type: Number,
        default: 0
    },
    courseProgress: {
        type: Number,
        default: 0
    },
    solvedExam: {
        type: Boolean,
        default: false
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
        required: true
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
    email: {
        type: String,
        required: true
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