const express = require('express');
const Instructor = require('../Models/instructorModel');


// get all instructors


// get a single instructor

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

// update an instructor



//export the functions
module.exports = {
    postInstructor
}