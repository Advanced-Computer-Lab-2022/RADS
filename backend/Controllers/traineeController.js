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
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a trainee with the corresponding id.' });
    }
    textBody = `You're Verified!, Click the link to return to change your password: http://localhost:3000/traineelobby/forgotpass/${id}`;
    sendMail(email, textBody);
    res.status(200).json({ message: "sent successfully" });
}


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
            courseGrade: courseGrade
        }
    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id }, { $push: newCourse }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newCourse);
        } else {
            res.status(400).json({ message: 'Not able to update reviews' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update grade
const postCourseGrade = async(req, res) => {
    const { courseId, courseGrade } = req.body;
    const newCourse = {
        courses: {
            courseId: courseId,
            courseGrade: courseGrade
        }
    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dbResp = await Trainee.findOneAndUpdate({ "_id": id }, { $push: newCourse }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newCourse);
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
    forgotPassword,
    postCourseGrade
}