const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingReviewSchema = mongoose.Schema({
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
    rating: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    instructorRating: {
        type: Object,
        rating: {
            type: Number
        },
        ratersCount: {
            type: Number
        },
        required: true
    },
    reviews: {
        type: [ratingReviewSchema]
    }
}, { timestamps: true })

module.exports = mongoose.model('Instructor', instructorSchema);