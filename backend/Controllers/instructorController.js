const Instructor = require('../Models/instructorModel');
const mongoose = require('mongoose');

// GET all instructors
const getInstructors = async(req, res) => {
    const instructors = await Instructor.find({}).sort({ createdAt: -1 });
    res.status(200).json(instructors);
}

// GET a single instructor
const getInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an instructor with the corresponding id.' });
    }
    const instructor = await Instructor.findById(id)
    if (!instructor) {
        return res.status(404).json({ error: 'No such instructor' });
    }
    res.status(200).json(instructor);
}

//post new instructor
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

// DELETE an instructor
const deleteInstructor = async(req, res) => {
    const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'There does not exist an instructor with the corresponding id.' });
        }
    const instructor = await Instructor.findOneAndDelete({ _id: id });
        if (!instructor) {
            return res.status(404).json({ error: 'No such instructor' });
        }
    res.status(200).json(instructor);
}

// UPDATE an instructor
const updateInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an instructor with the corresponding id.' });
    }
    const instructor = await Instructor.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!instructor) {
        return res.status(404).json({ error: 'No such instructor' });
    }
    res.status(200).json(instructor);
}

// Export the functions
module.exports = {
    getInstructors,
    getInstructor,
    postInstructor,
    deleteInstructor,
    updateInstructor
}