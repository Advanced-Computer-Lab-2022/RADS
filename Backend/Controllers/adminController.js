const express = require('express');
const Admin = require('../Models/adminModel');

const newAdmin = (req, res) => {
    admin = new Admin({
    userName: randomString(10),
    password: Math.floor(Math.random() * 100000000),
    })
    admin.save()
        .then(result => {
            res.status(200).json({
                message: "Admin added successfully",
                message: "your username is " + admin.userName + " and your password is " + admin.password, 
                admin: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Admin could not be added",
                error: err
            })
        })
}
module.exports = {
    newAdmin
}

