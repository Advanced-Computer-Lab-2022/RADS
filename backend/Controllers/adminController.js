const Admin = require('../Models/adminModel');
var randomstring = require("randomstring");
const Instructor = require('../Models/instructorModel');
const CorpTrainee = require('../Models/corpTraineeModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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
    const { firstName, lastName, country, phoneNumber, address, email, bio } = req.body;
    try {
        const instructor = await Instructor.create({
            firstName,
            lastName,
            country,
            phoneNumber,
            address,
            userName: req.body.firstName + req.body.lastName,
            password: randomstring.generate(7),
            email,
            bio,
            instructorRating: 1,
            ratersCount: 1
        });
        res.status(200).json({ message: "Instructor added successfully", message: "Your username is " + instructor.userName + " and your password is " + instructor.password });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const postCTrainee = async(req, res) => {
    const { firstName, lastName, country, phoneNumber, address } = req.body;
    try {
        const corpTrainee = await CorpTrainee.create({
            firstName,
            lastName,
            country,
            phoneNumber,
            address,
            userName: req.body.firstName + req.body.lastName,
            password: randomstring.generate(7)
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
const maxAge = 3 * 24 * 60 * 60;
const createToken = (userName) => {
    return jwt.sign({ userName }, 'supersecret', {
        expiresIn: maxAge
    });
};
const login = async (req, res) => {
    const {userName,password} = req.body;
    const admin = await Admin.findOne({userName : userName});
    if(admin){
        const auth = await bcrypt.compare(password, admin.password);
        if(auth){
            const token = createToken(admin.userName);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json(admin);
        }
        else{
            res.status(400).json({error : 'password is incorrect'})
        }
    }
    else{
        res.status(400).json({error : 'user not found'})
    }
  }
  
  const logout = async (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.status(200).json({ message: "logged out" })
  
  }
module.exports = {
    postAdmin,
    postCTrainee,
    postInstructor,
    editAdmin,
    getAdmins,
    login,
    logout
}