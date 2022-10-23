const express = require('express');
const Instructor = require('../Models/instructorModel');


// get all instructors


// get a single instructor

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
module.exports = {
    newInstructor
}
// delete an instructor

// update an instructor



//export the functions
module.exports = {
    postInstructor
}