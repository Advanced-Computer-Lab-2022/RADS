const Admin = require('../Models/adminModel');
var randomstring = require("randomstring");
const Instructor = require('../Models/instructorModel');
const CorpTrainee = require('../Models/corpTraineeModel');
const mongoose = require('mongoose');

const postAdmin = async(req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const admin = await Admin.create({ firstName, lastName, userName: req.body.firstName + req.body.lastName, password: randomstring.generate(7) });
        res.status(200).json({ message: "Admin added successfully", message: "Your username is " + admin.userName + " and your password is " + admin.password });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const postInstructor = async(req, res) => {
    const { firstName, lastName, userName, password, country, phoneNumber, address, email, gender, bio } = req.body;
    try {
        const instructor = await Instructor.create({
            firstName,
            lastName,
            country,
            phoneNumber,
            address,
            userName,
            password,
            email,
            gender,
            bio,
            instructorRating: 1,
            ratersCount: 1,
            reviews: []
        });
        res.status(200).json({ message: "Instructor added successfully", message: "Your username is " + instructor.userName + " and your password is " + instructor.password });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const postCTrainee = async(req, res) => {
    const { firstName, lastName, userName, gender, password, country, phoneNumber, address, email } = req.body;
    try {
        const corpTrainee = await CorpTrainee.create({
            firstName,
            lastName,
            userName,
            gender,
            password,
            country,
            phoneNumber,
            address,
            email,
            courses: [],
            notes: []
        });
        res.status(200).json({ message: "Corporate trainee added successfully", message: "Your username is " + corpTrainee.userName + " and your password is " + corpTrainee.password });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const editAdmin = async(req, res) => {

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an admin with the corresponding id.' });
    }
    const admin = await Admin.findByIdAndUpdate({ _id: id }, {
        userName: req.body.userName,
        password: req.body.password
    });
    if (!admin) {
        return res.status(404).json({ error: 'No such admin' });
    }
    res.status(200).json(admin);

}

const getAdmins = async(req, res) => {
    const admins = await Admin.find({}).sort({ createdAt: -1 });
    res.status(200).json(admins);
}

const getAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({
        error: "There does not exist an admin with the corresponding id.",
      });
  }
  const admin = await Admin.findById(id);
  if (!admin) {
    return res.status(404).json({ error: "No such trainee" });
  }
  res.status(200).json(admin);
};

module.exports = {
    postAdmin,
    postCTrainee,
    postInstructor,
    editAdmin,
    getAdmins,
    getAdmin
}