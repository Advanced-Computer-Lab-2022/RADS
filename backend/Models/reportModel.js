const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    traineeId: {
        type: mongoose.Types.ObjectId,
        ref: 'traineeModel'
    },
    corpTraineeId: {
        type: mongoose.Types.ObjectId,
        ref: 'traineeModel'
    },
    traineeComment: {
        type: String
    },
    corpTraineeComment: {
        type: String
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
    }

}, { timestamps: true })

module.exports = mongoose.model('Report', reportSchema);