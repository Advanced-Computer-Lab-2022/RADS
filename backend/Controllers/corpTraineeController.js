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
    const { courseId, courseGrade, courseProgress } = req.body;
    const newCourse = {
        courses: {
            courseId: courseId,
            courseGrade: courseGrade,
            courseProgress: courseProgress
        }
    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp1 = await CorpTrainee.findOne({ "_id": id, 'courses.courseId': courseId });
        if (!dbResp1) {
            const dbResp = await CorpTrainee.findOneAndUpdate({ "_id": id }, { $push: newCourse }, { new: true }).lean(true);
            if (dbResp) {
                // dbResp will be entire updated document, we're just returning newly added message which is input.
                res.status(201).json(newCourse);
            } else {
                res.status(400).json({ message: 'Not able to register grades' });
            }
        } else {
            res.status(400).json({ message: 'already in db' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const checkHaveAccess = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOne({ "_id": id, 'courses.courseId': courseId })
        if (!dbResp) {
            return res.status(200).json(false);
        } else {
            res.status(200).json(true);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const checkCourseProgress = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "courseProgress": { $exists: true } } } }, { "courses.courseId": 1, "courses.courseProgress": 1 })
        let result = dbResp.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].courseProgress;
        if (dbResp) {
            res.status(201).json(result);
        } else {
            res.status(400).json({ message: 'Not able to find progress' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const findExercisesGrade = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "exercisesGrade": { $exists: true } } } }, { "courses.courseId": 1, "courses.exercisesGrade": 1 })
        let result = dbResp.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].exercisesGrade;
        if (!dbResp) {
            return res.status(404).json({ error: 'No such grade for trainee' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get exam old grade
const findExamGrade = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "examGrade": { $exists: true } } } }, { "courses.courseId": 1, "courses.examGrade": 1 })
        let result = dbResp.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].examGrade;
        if (!dbResp) {
            return res.status(404).json({ error: 'No such grade for trainee' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const checkSolvingStatus = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "solvedExam": { $exists: true } } } }, { "courses.courseId": 1, "courses.solvedExam": 1 })
        let result = dbResp.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].solvedExam;
        if (dbResp) {
            res.status(201).json(result);
        } else {
            res.status(400).json({ message: 'Not able to find exam status' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const checkExercisesSolvingStatus = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "solvedExercises": { $exists: true } } } }, { "courses.courseId": 1, "courses.solvedExercises": 1 })
        let result = dbResp.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].solvedExercises;
        if (!dbResp) {
            res.status(400).json({ message: 'Not able to find status' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateExercisesGrade = async(req, res) => {
    const { courseId, exercisesGrade } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.exercisesGrade': exercisesGrade } });
        if (dbResp) {
            res.status(201).json("Successfull update!!");
        } else {
            res.status(400).json({ message: 'Not able to update' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSolvedExercises = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.solvedExercises': true } });
        if (dbResp) {
            res.status(201).json("Successfull update!!");
        } else {
            res.status(400).json({ message: 'Not able to update' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCourseProgress = async(req, res) => {
    const { courseId, currentChapter, totalChapters } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);

        let progressVal = (currentChapter / totalChapters) * 100;
        const dbRespOld = await CorpTrainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "courseProgress": { $exists: true } } } }, { "courses.courseId": 1, "courses.courseProgress": 1 })
        let result = dbRespOld.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].courseProgress;
        if (result >= progressVal) {
            res.status(200).json("Less progress!!");
        } else {
            const dbResp = await CorpTrainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.courseProgress': progressVal } });
            if (dbResp) {
                res.status(200).json("Successfull update!!");
            } else {
                res.status(400).json({ message: 'Not able to update' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSolvedExam = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.solvedExam': true } });
        if (dbResp) {
            res.status(201).json("Successfull update!!");
        } else {
            res.status(400).json({ message: 'Not able to update' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update exam grade
const updateExamGrade = async(req, res) => {
    const { courseId, examGrade } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await CorpTrainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.examGrade': examGrade } });
        if (dbResp) {
            res.status(201).json("Successfull update!!");
        } else {
            res.status(400).json({ message: 'Not able to update' });
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
    postCourseRegister,
    checkHaveAccess,
    checkCourseProgress,
    findExamGrade,
    findExercisesGrade,
    checkExercisesSolvingStatus,
    checkSolvingStatus,
    updateExercisesGrade,
    updateSolvedExercises,
    updateCourseProgress,
    updateSolvedExam,
    updateExamGrade
}