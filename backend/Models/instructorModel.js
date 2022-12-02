const { time } = require('console');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema({
    traineeRating: {
        type: Number
    },
    traineeReview: {
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
        required: true,
    },
    bio: {
        type: String
    },
    instructorRating: {
        rating: Number,
        ratersCount: Number
    },
    reviews: {
        type: [ReviewSchema]
    }
}, { timestamps: true })

module.exports = mongoose.model('Instructor', instructorSchema);