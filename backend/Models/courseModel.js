const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    cRating: {
        type: Number
    },
    cReview: {
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

const subTitleSchema = mongoose.Schema({
    subTitle: {
        type: String
    },
    description: {
        type: String
    },
    videoLink: {
        type: String
    },
    hours: {
        type: Number
    }
});

const questionSchema = mongoose.Schema({
    question: {
        type: String
    },
    firstChoice: {
        type: String
    },
    secondChoice: {
        type: String
    },
    thirdChoice: {
        type: String
    },
    fourthChoice: {
        type: String
    },
    answer: {
        type: String
    }
});

const exerciseSchema = mongoose.Schema({
    excerciseId: {
        type: Number
    },
    questions: {
        type: [questionSchema]
    },
    grade: {
        type: Number
    }
});

const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true
    },
    subtitles: {
        type: [subTitleSchema],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shortSummary: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    instructor: {
        type: mongoose.Types.ObjectId,
        ref: 'instructorModel'
    },
    courseExercises: {
        type: [exerciseSchema]
    },
    coursePreview: {
        type: String
    },
    courseRating: {
        type: Number
    },
    ratersCount: {
        type: Number
    },
    reviews: {
        type: [reviewSchema]
    },
    promotionRate: {
        type: Number,
        default: 1
    },
    promotionEndDate: {
        type: Date
    },
    promotionStartDate: {
        type: Date
    },
}, { timestamps: true })



module.exports = mongoose.model('Course', courseSchema)