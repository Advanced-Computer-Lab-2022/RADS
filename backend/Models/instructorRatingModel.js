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

const instructorRatingSchema = new Schema({
    instructorId: {
        type: mongoose.Types.ObjectId,
        ref: 'instructorModel',
        required: true
    },
    ratingInfo: {
        type: Object,
        required: true,
        rating: {
            type: Number
        },
        ratersCount: {
            type: Number
        }
    },
    reviews: {
        type: [ratingReviewSchema]
    }


}, { timestamps: true })

module.exports = mongoose.model('instructorRating', instructorRatingSchema);