const express = require('express');
const { getInstructor, getInstructors, deleteInstructor, updateInstructor, postInstructor, postInstructorReview, getInstructorRating, forgotPassword, updatePassword } = require('../Controllers/instructorController');
const router = express.Router();

// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('/:id', getInstructor);

// Post an instructor
router.get('/add', postInstructor);

// DELETE an instructor
router.delete('/:id', deleteInstructor);


// UPDATE instructor
router.patch('/changeInfo/:id', updateInstructor);


// UPDATE password
router.patch('/password/:id', updatePassword);

//router.post('/addPromotion/:id', addPromotion);   

// POST a new Review
router.post('/review/:id', postInstructorReview);

// GET a single Course's rating 
router.get('/rating/:id', getInstructorRating);

router.post('/forgot/:id', forgotPassword);

module.exports = router;