const Instructor = require('../Models/instructorModel');
const Course = require('../Models/courseModel');
const mongoose = require('mongoose');

// GET all instructors
const getInstructors = async(req, res) => {
    const instructors = await Instructor.find({}).sort({ createdAt: -1 });
    res.status(200).json(instructors);
}


const postInstructor = async(req, res) => {
    const { firstName, lastName, userName, password, country, phoneNumber, address, rating } = req.body;
    try {
        const instructor = await Instructor.create({
            firstName,
            lastName,
            userName,
            password,
            country,
            phoneNumber,
            address,
            rating
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
        password: req.body.password
    });
    if (!instructor) {
        return res.status(404).json({ error: 'No such instructor' });
    }
    res.status(200).json(instructor);
}

// FILTER a course based on instructor
const filterCourses = async(req, res) => {
    const instructorId = req.query.courseId;
    if (instructorId) {
        const result = await Course.find({ instructor: mongoose.Types.ObjectId(instructorId) }).populate('instructor');
        res.status(200).json(result)
    } else {
        res.status(400).json({ error: "courseId is required" })
    }
}



// Export the functions
module.exports = {
    getInstructors,
    postInstructor,
    getInstructor,
    deleteInstructor,
    updateInstructor,
    filterCourses
}