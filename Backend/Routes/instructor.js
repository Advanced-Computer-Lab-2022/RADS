const express = require('express');
const Instructor = require('../Models/instructorModel');
const { postInstructor } = require('../Controllers/instructorController');

const router = express.Router();


// GET all instructors info
router.get('/', (req, res) => {
    res.json({ mssg: "GET all instructors" });
});

// GET a single instructor's info 
router.get('/:id', (req, res) => {
    res.json({ mssg: "GET a single instructor" })
})

// POST a new workout
router.post('/', postInstructor);

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({ mssg: "DELETE an instructor" })
})

router.patch('/:id', (req, res) => {
    res.json({ mssg: "UPDATE a new instructor info" })
})

module.exports = router;