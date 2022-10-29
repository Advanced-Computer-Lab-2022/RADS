const express = require('express');
const { getInstructor, getInstructors, deleteInstructor, updateInstructor, viewCourse } = require('../Controllers/instructorController');
const { postInstructor } = require('../Controllers/adminController');
const router = express.Router();

// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('instructor/:id', getInstructor);

// GET all courses the instructors give
router.get('/:id', viewCourse);

// POST a new instructor
router.post('/add', postInstructor);

// DELETE an instructor
router.delete('/:id', deleteInstructor);

router.patch('/:id', updateInstructor);

router.get('/:id', viewCourse);

module.exports = router;