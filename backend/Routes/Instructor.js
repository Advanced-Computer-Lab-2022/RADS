const express = require('express');
const { getInstructor, getInstructors, deleteInstructor, updateInstructor } = require('../Controllers/instructorController');
const router = express.Router();

// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('/:id', getInstructor)

// GET all courses the instructors give
router.get('/viewCourse/:id', viewCourse);



// DELETE an instructor
router.delete('/:id', deleteInstructor);

router.patch('/:id', updateInstructor);



module.exports = router;