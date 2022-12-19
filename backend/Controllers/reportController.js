const Course = require('../Models/courseModel');
const Trainee = require('../Models/traineeModel');
const Report = require('../Models/reportModel');
const mongoose = require('mongoose');



const getRequest = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const request = await Report.findById(id)
    if (!request) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(request);
}

const getRefundRequests = async(req, res) => {
    const requests = await Report.find({ requestType: "Refund" }).sort({ createdAt: -1 });
    res.status(200).json(requests);
}

const getAccessRequests = async(req, res) => {
    const requests = await Report.find({ requestType: "Access" }).sort({ createdAt: -1 });
    res.status(200).json(requests);
}

const postRequest = async(req, res) => {
    const { traineeId, corpTraineeId, traineeComment, corpTraineeComment, courseId, courseProgress, refundAmount, requestType } = req.body;
    try {
        const request = await Report.create({
            traineeId,
            corpTraineeId,
            traineeComment,
            corpTraineeComment,
            courseId,
            courseProgress,
            refundAmount,
            requestType
        });
        res.status(200).json({ message: "Request added successfully", message: "request info" + request });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteRequest = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a request with the corresponding id.' });
    }
    const request = await Report.findByIdAndDelete({ _id: id });
    if (!request) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(request);
}



//////////////////////////////////
// Export the functions
//////////////////////////////////
module.exports = {
    getRequest,
    getRefundRequests,
    getAccessRequests,
    postRequest,
    deleteRequest
}