const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traineeCommentSchema = {
    traineeComment: {
        type: String
    }
}
const corpTraineeCommentSchema = {
    corpTraineeComment: {
        type: String
    }
}
const instructorCommentSchema = {
    instructorComment: {
        type: String
    }
}

const reportSchema = new Schema({
    traineeId: {
        type: mongoose.Types.ObjectId,
        ref: 'traineeModel'
    },
    corpTraineeId: {
        type: mongoose.Types.ObjectId,
        ref: 'traineeModel'
    },
    instructorId: {
        type: mongoose.Types.ObjectId,
        ref: 'instructorModel'
    },
    traineeComments: {
        type: [traineeCommentSchema]
    },
    corpTraineeComments: {
        type: [corpTraineeCommentSchema]
    },
    instructorComments: {
        type: [instructorCommentSchema]
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'courseModel'
    },
    courseProgress: {
        type: Number
    },
    refundAmount: {
        type: Number,
        default: 0
    },
    requestType: {
        type: String,
        required: true
    },
    reportStatus: {
        //unseen,pending,resolved
        type: String,
        default: "unseen"
    },
    adminCommment: {
        type: String,
        default: ""
    }
}, { timestamps: true })

module.exports = mongoose.model('Report', reportSchema);