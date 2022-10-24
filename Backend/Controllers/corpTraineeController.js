const CorpTrainee = require('../Models/corpTraineeModel');
const mongoose = require('mongoose');

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
    postCTrainee
}