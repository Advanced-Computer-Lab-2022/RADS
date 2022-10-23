const express = require('express');
const Instructor = require('../Models/instructorModel');
const { getInstructor, getInstructors, postInstructor, deleteInstructor, updateInstructor } = require('../Controllers/instructorController');

const router = express.Router();


// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('/:id', getInstructor)

// POST a new workout
router.post('/', postInstructor);

// DELETE a workout
router.delete('/:id', deleteInstructor)

router.patch('/:id', updateInstructor)

module.exports = router;