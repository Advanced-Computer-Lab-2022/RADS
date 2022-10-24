const express = require('express');
const Instructor = require('../Models/instructorModel');
const { getInstructor, getInstructors, postInstructor, deleteInstructor, updateInstructor } = require('../Controllers/instructorController');

const router = express.Router();


// GET all instructors info
router.get('/', getInstructors);

// GET a single instructor's info 
router.get('/:id', getInstructor)

// POST a new instructor
router.post('/add', function(req, res){
    postInstructor
});

// DELETE an instructor
router.delete('/:id', (req, res) => {
    res.json({ mssg: "DELETE an instructor" })
})

router.patch('/:id', updateInstructor)

module.exports = router;