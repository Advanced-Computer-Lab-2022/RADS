const express = require('express');
const Instructor = require('../Models/instructorModel');
const mongoose = require('mongoose');

// get all instructors
const getInstructors = async(req, res) => {
    const instructors = await Instructor.find({}).sort({ createdAt: -1 });
    res.status(200).json(instructors);
}

// get a single instructor
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

// post a new instructor
const newInstructor = (req, res) => {
    instructor = new Instructor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.firstName + req.body.lastName,
    password: Math.floor(Math.random() * 100000000),
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address
    })
    instructor.save()
        .then(result => {
            res.status(200).json({
                message: "Instructor added successfully",
                message: "your username is" + instructor.userName + "and your password is" + instructor.password, 
                instructor: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Instructor could not be added",
                error: err
            })
        })
}
// delete an instructor

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
    // update an instructor
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


//export the functions
module.exports = {
    getInstructors,
    getInstructor,
    newInstructor,
    deleteInstructor,
    updateInstructor
}
