const express = require('express');
const { getInstructor, getInstructors, deleteInstructor, updateInstructor, filterCourses, postInstructor } = require('../Controllers/instructorController');
const router = express.Router();

// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('/:id', getInstructor)

// Post an instructor
router.get('/add', postInstructor);

// GET all courses the instructors give
router.get('/filter', filterCourses);

// DELETE an instructor
router.delete('/:id', deleteInstructor);

router.patch('/:id', updateInstructor);



module.exports = router;