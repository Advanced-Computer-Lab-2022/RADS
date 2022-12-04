const Trainee = require('../Models/traineeModel');
const mongoose = require('mongoose');
const Course = require('../Models/courseModel');
const getTrainees = async(req, res) => {
    const trainees = await Trainee.find({}).sort({ createdAt: -1 });
    res.status(200).json(trainees);
}

const postTrainee = async(req, res) => {
    const { firstName, lastName, userName, password, country, phoneNumber, address } = req.body;
    try {
        const trainee = await Trainee.create({
            firstName,
            lastName,
            userName,
            password,
            country,
            phoneNumber,
            address,
            courses: []
        });
        res.status(200).json({ message: "trainee added successfully", message: "Instructor info" + trainee });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/*const resetPassword = async(req,res) =>{
    const {email:}
}*/


const getTrainee = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a trainee with the corresponding id.' });
    }
    const trainee = await Trainee.findById(id)
    if (!trainee) {
        return res.status(404).json({ error: 'No such trainee' });
    }
    res.status(200).json(trainee);
}
const updatePassword = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an trainee with the corresponding id.' });
    }
    const trainee = await Trainee.findByIdAndUpdate({ _id: id }, {
        password: req.body.password
    });
    if (!trainee) {
        return res.status(404).json({ error: 'No such trainee' });
    }
    res.status(200).json(trainee);
}


const getTraineeCourses = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a trainee with the corresponding id.' });
    }
    const trainee = await Trainee.findById(id)
    if (!trainee) {
        return res.status(404).json({ error: 'No such trainee' });
    }
    res.status(200).json(trainee.courses);
}

const postCourseRegister = async(req, res) => {
    const { courseId, courseGrade } = req.body;
    const newCourse = {
        courses: {
            courseId: courseId,
            exerciseGrades: courseGrade
        }
    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id }, { $push: newCourse }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newCourse);
        } else {
            res.status(400).json({ message: 'Not able to update grades' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//////////////////////////////////
// POST new Grade: trainee
//////////////////////////////////
const postGrade = async(req, res) => {
    const { excerciseId, grade } = req.body;
    const newGrade = {
        exerciseGrades: {
            excerciseId: excerciseId,
            grade: grade
        }
    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const trainee = await Trainee.findById({ "_id": id })
        const dbResp = await trainee.courses.findOneAndUpdate({ courseId: id }, { $push: newGrade }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newGrade);
        } else {
            res.status(400).json({ message: 'Not able to update reviews' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getTrainees,
    getTrainee,
    updatePassword,
    postCourseRegister,
    getTraineeCourses,
    postTrainee,
    postGrade
}