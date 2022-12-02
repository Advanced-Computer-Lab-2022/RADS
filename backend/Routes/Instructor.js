const express = require('express');
const { getInstructor, getInstructors, deleteInstructor, updateInstructor, filterCourses, postInstructor,login,logout } = require('../Controllers/instructorController');
const router = express.Router();

// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('/:id', getInstructor);

// Post an instructor
router.get('/add', postInstructor);

// GET all courses the instructors give
router.get('/filter', filterCourses);

// DELETE an instructor
router.delete('/:id', deleteInstructor);

router.patch('/changeInfo/:id', updateInstructor);

router.post('/login', login);
router.get('/logout', logout);
//router.post('/addPromotion/:id', addPromotion);




module.exports = router;