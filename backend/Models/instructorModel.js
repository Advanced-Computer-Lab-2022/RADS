const { time } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema({
    iRating: {
        type: Number
    },
    iReview: {
        type: String
    },
    traineeId: {
        type: mongoose.Types.ObjectId,
        ref: 'traineeModel'
    },
    corpTraineeId: {
        type: mongoose.Types.ObjectId,
        ref: 'corpTraineeModel'
    }
});

const instructorSchema = new Schema({
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
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    instructorRating: {
        type: Number
    },
    ratersCount: {
        type: Number
    },
    reviews: {
        type: [ReviewSchema]
    },
    role: {
        type: String,
        default: "INSTRUCTOR"
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Instructor', instructorSchema);