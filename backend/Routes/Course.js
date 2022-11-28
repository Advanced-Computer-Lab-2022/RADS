const express = require('express');
const { getCourses, getCourse, postCourse, deleteCourse, updateCourse, getCourseByInstructor } = require('../Controllers/courseController');


const router = express.Router();

// GET all Course info
router.get('/', getCourses);

// GET a single Course's info 
router.get('/:id', getCourse);

// GET all Courses by a specific instructor
router.get('/find/:id', getCourseByInstructor);

// POST a new Course
router.post('/add', postCourse);

// DELETE a Course
router.delete('/:id', deleteCourse);

// UPDATE Course
router.patch('/:id', updateCourse);

module.exports = router;