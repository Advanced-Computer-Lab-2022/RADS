const express = require('express');
const { getTrainees, updatePassword, postCourseRegister, getTrainee, getTraineeCourses, postTrainee, postGrade } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/', getTrainees);
router.get('/:id', getTrainee);
router.post('/add', postTrainee);
router.get('/getcourses/:id', getTraineeCourses);
router.patch('/password/:id', updatePassword);
router.post('/register/:id', postCourseRegister);
router.post('/grade/:id', postGrade);

module.exports = router;