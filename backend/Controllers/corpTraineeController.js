const CorpTrainee = require('../Models/corpTraineeModel');
const mongoose = require('mongoose');

const getCTrainees = async(req, res) => {
    const corpTrainees = await CorpTrainee.find({}).sort({ createdAt: -1 });
    res.status(200).json(corpTrainees);
}

const getCTrainee = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a CT with the corresponding id.' });
    }
    const corpTrainee = await CorpTrainee.findById(id)
    if (!corpTrainee) {
        return res.status(404).json({ error: 'No such CT' });
    }
    res.status(200).json(corpTrainee);
}

const updatePassword = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an CT with the corresponding id.' });
    }
    const corpTrainee = await CorpTrainee.findByIdAndUpdate({ _id: id }, {
        password: req.body.password
    });
    if (!corpTrainee) {
        return res.status(404).json({ error: 'No such CT' });
    }
    res.status(200).json(corpTrainee);
}

const getCTraineeCourses = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a trainee with the corresponding id.' });
    }
    const corpTrainee = await CorpTrainee.findById(id)
    if (!corpTrainee) {
        return res.status(404).json({ error: 'No such trainee' });
    }
    res.status(200).json(corpTrainee.courses);
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
        const dbResp = await CorpTrainee.findOneAndUpdate({ "_id": id }, { $push: newCourse }, { new: true }).lean(true);
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
        const corpTrainee = await CorpTrainee.findById({ "_id": id })
        const dbResp = await corpTrainee.courses.findOneAndUpdate({ courseId: id }, { $push: newGrade }, { new: true }).lean(true);
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
    getCTrainees,
    getCTrainee,
    updatePassword,
    getCTraineeCourses,
    postGrade,
    postCourseRegister
}