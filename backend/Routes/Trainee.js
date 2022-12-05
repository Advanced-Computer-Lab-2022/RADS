const express = require('express');
const { getTrainees, updatePassword, postCourseRegister, getTrainee, getTraineeCourses, postTrainee, forgotPassword, postCourseGrade } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/', getTrainees);
router.get('/:id', getTrainee);
router.post('/add', postTrainee);
router.post('/forget/:id', forgotPassword);
router.get('/getcourses/:id', getTraineeCourses);
router.patch('/password/:id', updatePassword);
router.post('/register/:id', postCourseRegister);
router.post('/update/:id', postCourseGrade);

module.exports = router;