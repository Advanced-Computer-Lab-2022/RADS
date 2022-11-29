const mongoose = require('mongoose');


const Schema = mongoose.Schema;

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

const exerciseSchema = mongoose.Schema({
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
    courseRating: {
        type: Number,
        required: true
    },
    courseExercises: {
        type: [exerciseSchema]
    },
    coursePreview: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)