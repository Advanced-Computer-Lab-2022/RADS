const express = require('express');
const { getCourses, getCourse, postCourse, deleteCourse, updateCourse, getCoursesByInstructor, postCourseReview, getCourseRating, getCourseExercise, getCourseExercises, postPromotion, deletePromo, maxPrice, getCourseSubset, updateViews, getHighestViewedCourses } = require('../Controllers/courseController');


const router = express.Router();

// GET all Course info
router.get('/', getCourses);

// GET a single Course's info 
router.get('/:id', getCourse);

// GET all Courses by a specific instructor
router.get('/find/:id', getCoursesByInstructor);

// POST a new Course
router.post('/add', postCourse);

// DELETE a Course
router.delete('/:id', deleteCourse);

// UPDATE Course
router.patch('/:id', updateCourse);

// POST a new Review
router.post('/review/:id', postCourseReview);

// GET a single Course's rating 
router.get('/rating/:id', getCourseRating);

// GET a single Course's exercise 
router.get('/exercise/:id/:eid', getCourseExercise);

// GET all Course's Exercises
router.get('/exercises/:id/', getCourseExercises);

// POST Course's Promotion  
router.post('/promo/:id', postPromotion);

// UPDATE Course Promotion
router.patch('/updatepromo/:id', deletePromo);

// GET max price
router.post('/max', maxPrice);

// GET Some courses
router.post('/subset', getCourseSubset);

// UPDATE the views for a course
router.patch('/updateviews/:id', updateViews);

// GET Highest viewed courses
router.get('/highest/views', getHighestViewedCourses);

module.exports = router;