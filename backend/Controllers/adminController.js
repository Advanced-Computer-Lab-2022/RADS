const Admin = require('../Models/adminModel');
const Instructor = require('../Models/instructorModel');
const CorpTrainee = require('../Models/corpTraineeModel');
const mongoose = require('mongoose');

const postAdmin = async (req, res) => {
      try {
      const admin = await Admin.create({ userName: randomSring(10), password: Math.floor(Math.random() * 100000000) });
      res.status(200).json({ message: "Admin added successfully", message: "Your username is " + admin.userName + " and your password is " + admin.password});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  const postInstructor = async (req, res) => {
    const {firstName, lastName, country, phoneNumber, address} = req.body;
      try {
      const instructor = await Instructor.create({ firstName, lastName, country, phoneNumber, address, userName: req.body.firstName + req.body.lastName,
        password: Math.floor(Math.random() * 100000000) });
      res.status(200).json({ message: "Instructor added successfully", message: "Your username is " + instructor.userName + " and your password is " + instructor.password});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
const postCTrainee = async (req, res) => {
  const {firstName, lastName, country, phoneNumber, address} = req.body;
    try {
    const corpTrainee = await CorpTrainee.create({ firstName, lastName, country, phoneNumber, address, userName: req.body.firstName + req.body.lastName,
      password: Math.floor(Math.random() * 100000000) });
    res.status(200).json({ message: "Corporate trainee added successfully", message: "Your username is " + corpTrainee.userName + " and your password is " + corpTrainee.password});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
    postAdmin,
    postCTrainee,
    postInstructor
}