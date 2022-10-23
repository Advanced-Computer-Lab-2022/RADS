const express = require('express');
const Admin = require('../Models/adminModel');
const { postInstructor } = require('../Controllers/adminController');

const router = express.Router();

router.post('/add', postInstructor);

module.exports = router;