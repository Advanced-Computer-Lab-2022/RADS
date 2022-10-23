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
const postInstructor = async(req, res) => {
    const { userName, password, country } = req.body;
    try {
        const instructor = await Instructor.create({ userName, password, country });
        res.status(200).json(instructor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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
    postInstructor,
    deleteInstructor,
    updateInstructor
}