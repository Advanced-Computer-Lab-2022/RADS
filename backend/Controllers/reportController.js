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

const getReportedCoursesTrainee = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a traine with the corresponding id.' });
    }
    const requests = await Report.find({ traineeId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).select('traineeId corpTraineeId instructorId traineeComments corpTraineeComments instructorComments courseId reportStatus adminComment');
    if (!requests) {
        return res.status(404).json({ error: 'No courses' });
    }
    res.status(200).json(requests);
}


const getReportedCoursesCorpTrainee = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a traine with the corresponding id.' });
    }
    const requests = await Report.find({ corpTraineeId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).select('traineeId corpTraineeId instructorId traineeComments corpTraineeComments instructorComments courseId reportStatus adminComment');
    if (!requests) {
        return res.status(404).json({ error: 'No courses' });
    }
    res.status(200).json(requests);
}


const getReportedCoursesInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a traine with the corresponding id.' });
    }
    const requests = await Report.find({ instructorId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).select('traineeId corpTraineeId instructorId traineeComments corpTraineeComments instructorComments courseId reportStatus adminComment');
    if (!requests) {
        return res.status(404).json({ error: 'No courses' });
    }
    res.status(200).json(requests);
}

const getReportedProblems = async(req, res) => {
    const requests = await Report.find({ requestType: ['Other', 'Financial', 'Technical'] }).select('traineeId corpTraineeId instructorId traineeComments corpTraineeComments instructorComments courseId requestType reportStatus adminComment');
    if (!requests) {
        return res.status(404).json({ error: 'No courses' });
    }
    res.status(200).json(requests);
}

const getRefundRequests = async(req, res) => {
    const requests = await Report.find({ requestType: "Refund" }).sort({ createdAt: -1 });
    if (!requests) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(requests);
}

const getAccessRequests = async(req, res) => {
    const requests = await Report.find({ requestType: "Access" }).sort({ createdAt: -1 });
    if (!requests) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(requests);
}


const postCommentTrainee = async(req, res) => {
    const { traineeComment } = req.body;
    const newComment = {
        traineeComments: {
            traineeComment: traineeComment
        }

    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Report.findOneAndUpdate({ "_id": id }, { $push: newComment }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newComment);
        } else {
            res.status(400).json({ message: 'Not able to update Comments' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const postCommentCorpTrainee = async(req, res) => {
    const { corpTraineeComment } = req.body;
    const newComment = {
        corpTraineeComments: {
            corpTraineeComment: corpTraineeComment
        }

    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Report.findOneAndUpdate({ "_id": id }, { $push: newComment }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newComment);
        } else {
            res.status(400).json({ message: 'Not able to update Comments' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postCommentInstructor = async(req, res) => {
    const { instructorComment } = req.body;
    const newComment = {
        instructorComments: {
            instructorComment: instructorComment
        }

    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Report.findOneAndUpdate({ "_id": id }, { $push: newComment }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newComment);
        } else {
            res.status(400).json({ message: 'Not able to update Comments' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postRequest = async(req, res) => {
    const { traineeId, corpTraineeId, instructorId, courseId, courseProgress, refundAmount, requestType, reportStatus, adminComment } = req.body;
    try {
        const request = await Report.create({
            traineeId,
            corpTraineeId,
            instructorId,
            traineeComments: [],
            corpTraineeComments: [],
            instructorComments: [],
            courseId,
            courseProgress,
            refundAmount,
            requestType,
            reportStatus,
            adminComment
        });
        res.status(200).json(request._id);
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

const updateRequest = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a request with the corresponding id.' });
    }
    const course = await Report.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!course) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(course);
}


const getTraineeUnresolvedRequests = async(req, res) => {
    const { id } = req.params;
    const requests = await Report.find({ traineeId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).sort({ createdAt: -1 }).select('traineeId traineeComments courseId reportStatus requestType adminComment');
    let result = requests.filter((item) => item["reportStatus"].includes("unseen") || item["reportStatus"].includes("pending"));
    if (!requests) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(result);
}

const getCorpTraineeUnresolvedRequests = async(req, res) => {
    const { id } = req.params;
    const requests = await Report.find({ corpTraineeId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).sort({ createdAt: -1 }).select('corpTraineeId corpTraineeComments courseId reportStatus requestType adminComment');
    let result = requests.filter((item) => item["reportStatus"].includes("unseen") || item["reportStatus"].includes("pending"));
    if (!requests) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(result);
}

const getInstructorUnresolvedRequests = async(req, res) => {
    const { id } = req.params;
    const requests = await Report.find({ instructorId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).sort({ createdAt: -1 }).select('instructorId instructorComments courseId reportStatus requestType adminComment');
    let result = requests.filter((item) => item["reportStatus"].includes("unseen") || item["reportStatus"].includes("pending"));
    if (!requests) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(result);
}

const getTraineeResolvedRequests = async(req, res) => {
    const { id } = req.params;
    const requests = await Report.find({ traineeId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).sort({ createdAt: -1 }).select('traineeId traineeComments courseId reportStatus requestType adminComment');
    let result = requests.filter((item) => item["reportStatus"].includes("resolved"));
    if (!requests) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(result);
}

const getCorpTraineeResolvedRequests = async(req, res) => {
    const { id } = req.params;
    const requests = await Report.find({ corpTraineeId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).sort({ createdAt: -1 }).select('corpTraineeId corpTraineeComments courseId reportStatus requestType adminComment');
    let result = requests.filter((item) => item["reportStatus"].includes("resolved"));
    if (!requests) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(result);
}

const getInstructorResolvedRequests = async(req, res) => {
    const { id } = req.params;
    const requests = await Report.find({ instructorId: id }, { requestType: ['Other', 'Financial', 'Technical'] }).sort({ createdAt: -1 }).select('instructorId instructorComments courseId reportStatus requestType adminComment');
    let result = requests.filter((item) => item["reportStatus"].includes("resolved"));
    if (!requests) {
        return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(result);
}




//////////////////////////////////
// Export the functions
//////////////////////////////////
module.exports = {
    getRequest,
    getRefundRequests,
    getAccessRequests,
    postRequest,
    deleteRequest,
    getReportedCoursesTrainee,
    getReportedCoursesCorpTrainee,
    getReportedCoursesInstructor,
    updateRequest,
    postCommentCorpTrainee,
    postCommentInstructor,
    postCommentTrainee,
    getTraineeResolvedRequests,
    getTraineeUnresolvedRequests,
    getCorpTraineeResolvedRequests,
    getCorpTraineeUnresolvedRequests,
    getInstructorResolvedRequests,
    getInstructorUnresolvedRequests,
    getReportedProblems
}