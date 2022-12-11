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
    email: {
        type: String,
        required: true
    },
    courses: {
        type: [courseSchema]
    },
    creditCards: {
        type: [creditCardSchema]
    }

}, { timestamps: true })

module.exports = mongoose.model('Trainee', traineeSchema);