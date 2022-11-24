const express = require('express');
const { getInstructor, getInstructors, deleteInstructor, updateInstructor, viewCourses } = require('../Controllers/instructorController');
const router = express.Router();

// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('/:id', getInstructor);

// GET all courses the instructors give
router.get('/viewcourses/:id', viewCourses);



// DELETE an instructor
router.delete('/:id', deleteInstructor);

router.post('/changeInfo/:id', updateInstructor);



module.exports = router;