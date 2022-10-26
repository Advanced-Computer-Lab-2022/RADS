const express = require('express');
const { getCourses, getCourse, postCourse, deleteCourse, updateCourse } = require('../Controllers/courseController');

const router = express.Router();

// GET all instructors info
router.get('/', getCourses);

// GET a single instructor's info 
router.get('/:id', getCourse)

// POST a new instructor
router.post('/add', postCourse);

// DELETE an instructor
router.delete('/:id', deleteCourse);

router.patch('/:id', updateCourse);

module.exports = router;