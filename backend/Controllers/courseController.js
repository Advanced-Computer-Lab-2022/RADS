const Course = require('../Models/courseModel');
const Instructor = require('../Models/instructorModel');
const mongoose = require('mongoose');

// GET all courses
const getCourses = async(req, res) => {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.status(200).json(courses);
}

// GET a single course
const getCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findById(id)
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}


const getCourseByInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course that has an Instructor with the corresponding id.' });
    }
    const course = await Course.find({ instructor: id }).sort({ createdAt: -1 });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

// const filterCourse = async(req, res) => {
//     const courseId = req.query.courseId;
//     if (courseId) {
//         const result = await Course.find({ _id: mongoose.Types.ObjectId(courseId) }).populate('_id');
//         res.status(200).json(result)
//     } else {
//         res.status(400).json({ error: "courseId is required" })
//     }
// }


// POST new course
const postCourse = async(req, res) => {
    const { courseTitle, subtitles, price, shortSummary, subject, totalHours, instructor, courseRating, courseExercises, coursePreview } = req.body;
    try {
        const course = await Course.create({
            courseTitle,
            subtitles,
            price,
            shortSummary,
            subject,
            totalHours,
            instructor,
            courseRating,
            courseExercises,
            coursePreview
        });
        res.status(200).json({ message: "Course added successfully", message: "Course info" + course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE a course
const deleteCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findOneAndDelete({ _id: id });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

// UPDATE a course
const updateCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

// Export the functions
module.exports = {
    getCourses,
    getCourse,
    postCourse,
    deleteCourse,
    updateCourse,
    getCourseByInstructor
}