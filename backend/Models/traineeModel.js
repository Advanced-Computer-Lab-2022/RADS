const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'courseModel',
    },
    note: {
        type: String
    }
})

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
    },
    receivedCertificate: {
        type: Boolean,
        default: false
    }
})

const creditCardSchema = new Schema({
    cardName: {
        type: String
    },
    cardNumber: {
        type: Number
    },
    cardExpiryDate: {
        type: Date
    },
    cardCVV: {
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
        unique: true,
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
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    courses: {
        type: [courseSchema],
        default: []
    },
    creditCards: {
        type: [creditCardSchema],
        default: []
    },
    balance: {
        type: Number,
        default: 0
    },
    notes: {
        type: [noteSchema],
        default: []
    },
    role: {
        type: String,
        default: "TRAINEE"
    }
}, { timestamps: true })

module.exports = mongoose.model('Trainee', traineeSchema);