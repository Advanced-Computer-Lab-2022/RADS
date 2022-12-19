const Trainee = require('../Models/traineeModel');
const mongoose = require('mongoose');
const Course = require('../Models/courseModel');
const nodemailer = require("nodemailer");
const { sendMail } = require('../Utilities/sendEmail');


const forgotPassword = async(req, res) => {
    const { email } = req.body;
    console.log(email);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a trainee with the corresponding id.' });
    }
    textBody = `You're Verified!, Click the link to return to change your password: http://localhost:3000/forgotpasstrainee/${id}`;
    sendMail(email, textBody);
    res.status(200).json({ message: "sent successfully" });
}

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const getTrainees = async(req, res) => {
    const trainees = await Trainee.find({}).sort({ createdAt: -1 });
    res.status(200).json(trainees);
}



const postTrainee = async(req, res) => {
    const { firstName, lastName, userName, password, country, phoneNumber, address, gender, email } = req.body;
    try {
        const trainee = await Trainee.create({
            firstName,
            lastName,
            userName,
            password,
            country,
            phoneNumber,
            address,
            gender,
            email,
            courses: [],
            creditCards: [],
            balance: 0
        });
        res.status(200).json({ message: "trainee added successfully", message: "Instructor info" + trainee });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


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
        const dbResp1 = await Trainee.findOne({ "_id": id, 'courses.courseId': courseId });
        if (!dbResp1) {
            const dbResp = await Trainee.findOneAndUpdate({ "_id": id }, { $push: newCourse }, { new: true }).lean(true);
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

const postCreditCard = async(req, res) => {
    const { cardName, cardNumber, cardExpiryDate, cardCVV } = req.body;
    const newCreditCard = {
        creditCards: {
            cardName: cardName,
            cardNumber: cardNumber,
            cardExpiryDate: cardExpiryDate,
            cardCVV: cardCVV
        }
    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id }, { $push: newCreditCard }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newCreditCard);
        } else {
            res.status(400).json({ message: 'Not able to add CreditCard' });
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
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.examGrade': examGrade } });
        if (dbResp) {
            res.status(201).json("Successfull update!!");
        } else {
            res.status(400).json({ message: 'Not able to update' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update exercises grade
const updateExercisesGrade = async(req, res) => {
    const { courseId, exercisesGrade } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.exercisesGrade': exercisesGrade } });
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
            const dbResp = await Trainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.solvedExercises': true } });
            if (dbResp) {
                res.status(201).json("Successfull update!!");
            } else {
                res.status(400).json({ message: 'Not able to update' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //get exercises old grade
const findExercisesGrade = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "exercisesGrade": { $exists: true } } } }, { "courses.courseId": 1, "courses.exercisesGrade": 1 })
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
        const dbResp = await Trainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "examGrade": { $exists: true } } } }, { "courses.courseId": 1, "courses.examGrade": 1 })
        let result = dbResp.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].examGrade;
        if (!dbResp) {
            return res.status(404).json({ error: 'No such grade for trainee' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const checkRegistered = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        //const dbResp = await Trainee.findOne({ "_id": id }, { courses: { $elemMatch: { courseId: courseId } } });
        const dbResp = await Trainee.findOne({ "_id": id, 'courses.courseId': courseId })
        if (!dbResp) {
            return res.status(200).json(false);
        } else {
            res.status(200).json(true);
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
        const dbRespOld = await Trainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "courseProgress": { $exists: true } } } }, { "courses.courseId": 1, "courses.courseProgress": 1 })
        let result = dbRespOld.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].courseProgress;
        if (result >= progressVal) {
            res.status(200).json("Less progress!!");
        } else {
            const dbResp = await Trainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.courseProgress': progressVal } });
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
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.solvedExam': true } });
        if (dbResp) {
            res.status(201).json("Successfull update!!");
        } else {
            res.status(400).json({ message: 'Not able to update' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTraineeBalance = async(req, res) => {
    const { balanceValue } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const trainee = await Trainee.findById(id);
        let oldBalance = trainee.balance;
        let newBalance = oldBalance + balanceValue;
        trainee.balance = newBalance;
        await trainee.save();
        res.status(201).json("Successfull update!!");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const checkCourseProgress = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "courseProgress": { $exists: true } } } }, { "courses.courseId": 1, "courses.courseProgress": 1 })
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

const checkSolvingStatus = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "solvedExam": { $exists: true } } } }, { "courses.courseId": 1, "courses.solvedExam": 1 })
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

const findCreditCard = async(req, res) => {
    const { creditCardId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOne({ "_id": id, creditCards: { $elemMatch: { '_id': creditCardId, "cardExpiryDate": { $exists: true } } } }, { "creditCards._id": 1, "creditCards.cardExpiryDate": 1 })
        let result = dbResp.creditCards.filter((item) => (item["_id"].toString().toLowerCase().includes(creditCardId.toString().toLowerCase())))[0].cardExpiryDate;
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
        const dbResp = await Trainee.findOne({ "_id": id, courses: { $elemMatch: { 'courseId': courseId, "solvedExercises": { $exists: true } } } }, { "courses.courseId": 1, "courses.solvedExercises": 1 })
        let result = dbResp.courses.filter((item) => (item["courseId"].toString().toLowerCase().includes(courseId.toString().toLowerCase())))[0].solvedExercises;
        if (!dbResp) {
            res.status(400).json({ message: 'Not able to find status' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const refundCourse = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const trainee = await Trainee.findById(id);
        const course = await Course.findById(courseId);
        const update = await Trainee.update({ _id: id }, { $pull: { courses: { courseId: courseId } } });
        let traineeBalance = trainee.balance + course.price;
        trainee.balance = traineeBalance;
        await trainee.save();
        if (!update) {
            res.status(400).json({ message: 'Not able to remove refund' });
        }
        res.status(200).json({ message: "refund done successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteCreditCard = async(req, res) => {
    const { creditCardId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const update = await Trainee.update({ _id: id }, { $pull: { creditCards: { _id: creditCardId } } });
        if (!update) {
            res.status(400).json({ message: 'Not able to remove credit card' });
        }
        res.status(200).json({ message: "credit card removed done successfully!" });
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
    forgotPassword,
    findExercisesGrade,
    postCreditCard,
    checkRegistered,
    updateCourseProgress,
    checkCourseProgress,
    refundCourse,
    updateTraineeBalance,
    updateSolvedExam,
    updateExercisesGrade,
    updateExamGrade,
    updateSolvedExercises,
    findExamGrade,
    checkSolvingStatus,
    checkExercisesSolvingStatus,
    findCreditCard,
    deleteCreditCard
}