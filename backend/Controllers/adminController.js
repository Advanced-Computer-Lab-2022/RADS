const Admin = require('../Models/adminModel');
const mongoose = require('mongoose');

const postAdmin = async (req, res) => {
      try {
      const admin = await Admin.create({ userName: randomSring(10), password: Math.floor(Math.random() * 100000000) });
      res.status(200).json({ message: "Admin added successfully", message: "Your username is " + admin.userName + " and your password is " + admin.password});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
module.exports = {
    postAdmin
}