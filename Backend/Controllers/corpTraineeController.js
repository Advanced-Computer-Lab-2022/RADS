const express = require('express');
const CorpTrainee = require('../Models/corpTraineeModel');

const newCTrainee = (req, res) => {
        corpTrainee = new CorpTrainee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.firstName + req.body.lastName,
        password: Math.floor(Math.random() * 100000000),
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    })
    corpTrainee.save()
        .then(result => {
            res.status(200).json({
                message: "Corp Trainee added successfully",
                message: "your username is " + corpTrainee.userName + " and your password is " + corpTrainee.password, 
                corpTrainee: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Corp Trainee could not be added",
                error: err
            })
        })
}
module.exports = {
    newCTrainee
}