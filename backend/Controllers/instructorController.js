const Instructor = require('../Models/instructorModel');
const Course = require('../Models/courseModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { sendMail } = require('../Utilities/sendEmail');
// GET all instructors
const getInstructors = async(req, res) => {
    const instructors = await Instructor.find({}).sort({ createdAt: -1 });
    res.status(200).json(instructors);
}


const postInstructor = async(req, res) => {
    const { firstName, lastName, userName, password, country, phoneNumber, address, email, bio, instructorRating, ratersCount, reviews } = req.body;
    try {
        const instructor = await Instructor.create({
            firstName,
            lastName,
            userName,
            password,
            country,
            phoneNumber,
            address,
            email,
            bio,
            instructorRating,
            ratersCount,
            reviews
        });
        res.status(200).json({ message: "Instructor added successfully", message: "Instructor info" + instructor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET a single instructor
const getInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an instructor with the corresponding id.' });
    }
    const instructor = await Instructor.findById(id)
    if (!instructor) {
        return res.status(404).json({ error: 'No such instructor' });
    }
    res.status(200).json(instructor);
}

// DELETE an instructor
const deleteInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an instructor with the corresponding id.' });
    }
    const instructor = await Instructor.findOneAndDelete({ _id: id });
    if (!instructor) {
        return res.status(404).json({ error: 'No such instructor' });
    }
    res.status(200).json(instructor);
}

// UPDATE an instructor
const updateInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an instructor with the corresponding id.' });
    }
    const instructor = await Instructor.findByIdAndUpdate({ _id: id }, {
        email: req.body.email,
        bio: req.body.bio,
        password: req.body.password,
        verified: req.body.verified
    });
    if (!instructor) {
        return res.status(404).json({ error: 'No such instructor' });
    }
    res.status(200).json(instructor);
}


// UPDATE Password
const updatePassword = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an trainee with the corresponding id.' });
    }
    const trainee = await Instructor.findByIdAndUpdate({ _id: id }, {
        password: req.body.password
    });
    if (!trainee) {
        return res.status(404).json({ error: 'No such trainee' });
    }
    res.status(200).json(trainee);
}


// FILTER a course based on instructor
/*const filterCourses = async(req, res) => {
    const instructorId = req.query.courseId;
    if (instructorId) {
        const result = await Course.find({ instructor: mongoose.Types.ObjectId(instructorId) }).populate('instructor');
        res.status(200).json(result)
    } else {
        res.status(400).json({ error: "courseId is required" })
    }
} */


//add promotionrate and promotionenddate in course

//add a review to an instructor
const postInstructorReview = async(req, res) => {
    const { iRating, iReview, traineeId, corpTraineeId } = req.body;
    const newReview = {
        reviews: {
            iRating: iRating,
            iReview: iReview,
            traineeId: traineeId,
            corpTraineeId: corpTraineeId
        }

    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const instructor = await Instructor.findById({ "_id": id })
        const currentOverallRating = instructor.instructorRating;
        let currentRatingCount = instructor.ratersCount;
        const newOverallRating = (currentOverallRating * currentRatingCount + iRating) / (currentRatingCount + 1);
        currentRatingCount += 1;
        instructor.instructorRating = newOverallRating;
        instructor.ratersCount = currentRatingCount;
        await instructor.save();
        const dbResp = await Instructor.findOneAndUpdate({ "_id": id }, { $push: newReview }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newReview);
        } else {
            res.status(400).json({ message: 'Not able to update reviews' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const forgotPassword = async(req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a trainee with the corresponding id.' });
    }
    //http://localhost:3000/forgotpass/instructorId=${id}
    textBody = `You're Verified!, Click the link to return to change your password: http://localhost:3000/forgotpassinstructor/${id}`;
    sendMail(email, textBody);
    res.status(200).json({ message: "sent successfully" });
}


// GET a single course rating
const getInstructorRating = async(req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const instructor = await Instructor.findById({ "_id": id })
    currentOverallRating = instructor.courseRating.rating
    res.status(200).json("Course Rating is: " + currentOverallRating)
}


// Export the functions
module.exports = {
    getInstructors,
    postInstructor,
    getInstructor,
    deleteInstructor,
    updateInstructor,
    postInstructorReview,
    getInstructorRating,
    forgotPassword,
    updatePassword,
}