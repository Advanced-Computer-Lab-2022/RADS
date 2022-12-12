const Trainee = require('../Models/traineeModel');
const mongoose = require('mongoose');
const Course = require('../Models/courseModel');
const nodemailer = require("nodemailer");
const { sendMail } = require('../Utilities/sendEmail');

// const getRequest = async(req,res) =>{
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: "aboahmedabomohamed@gmail.com",
//             pass: "Khaled01020304",
//         }
//     });
//     let mailOptions = {
//         from: "aboahmedabomohamed@gmail.com",
//         to: "khaledayman012@gmail.com",
//         subject: 'Test Mail',
//         text: 'TESTINGGGGGG !',
//     }
//     transporter.sendMail(mailOptions, function(err, data) {
//         if (err) {
//             res.status(400).json({message:'Error Occurs'});
//         } else {
//             res.status(200).json({message:'Email sent successfully'});
//         }
//     });
// }

// const getRequest = async(req,res) =>{
//     sendMail();
//         if (err) {
//             res.status(400).json({message:'Error Occurs'});
//         } else {
//             res.status(200).json({message:'Email sent successfully'});
//         }

// }

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
    const { firstName, lastName, userName, password, country, phoneNumber, address, email } = req.body;
    try {
        const trainee = await Trainee.create({
            firstName,
            lastName,
            userName,
            password,
            country,
            phoneNumber,
            address,
            email,
            courses: [],
            creditCards: []
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

const maxAge = 3 * 24 * 60 * 60;
const createToken = (userName) => {
    return jwt.sign({ userName }, 'supersecret', {
        expiresIn: maxAge
    });
};

const signUp = async(req, res) => {
    const { userName, firstName, lastName, gender, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const trainee = await Trainee.create({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            password: hashedPassword
        });
        const token = createToken(trainee.userName);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(trainee)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async(req, res) => {
    const { userName, password } = req.body;
    const trainee = await Trainee.findOne({ userName: userName });
    if (trainee) {
        const auth = await bcrypt.compare(password, trainee.password);
        if (auth) {
            const token = createToken(trainee.userName);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json(trainee);
        } else {
            res.status(400).json({ error: 'password is incorrect' })
        }
    } else {
        res.status(400).json({ error: 'user not found' })
    }
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
const logout = async(req, res) => {
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
        res.status(200).json({ message: "logged out" })
    }
    //update grade
const postCourseGrade = async(req, res) => {
    const { courseId, courseGrade } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id, 'courses.courseId': courseId }, { '$set': { 'courses.$.courseGrade': courseGrade } });
        if (dbResp) {
            res.status(201).json("Successfull update!!");
        } else {
            res.status(400).json({ message: 'Not able to update' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get old grade
const findOldGrade = async(req, res) => {
    const { courseId } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOne({ "_id": id, 'courses.courseId': courseId });
        let oldGrade = dbResp.courseGrade;
        console.log(oldGrade);
        if (!dbResp) {
            return res.status(404).json({ error: 'No such grade for trainee' });
        }
        res.status(200).json(oldGrade);
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

module.exports = {
    getTrainees,
    getTrainee,
    updatePassword,
    postCourseRegister,
    getTraineeCourses,
    postTrainee,
    forgotPassword,
    postCourseGrade,
    findOldGrade,
    postCreditCard,
    checkRegistered,
    signUp,
    login,
    logout
}