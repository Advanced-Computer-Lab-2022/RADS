const express = require('express');
const { getCTrainees, updatePassword, postCourseRegister, getCTrainee, postGrade, getCTraineeCourses } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.get('/', getCTrainees);
router.get('/:id', getCTrainee);
router.get('/getcourses/:id', getCTraineeCourses);
router.patch('/password/:id', updatePassword);
router.post('/register/:id', postCourseRegister);
router.post('/grade/:id', postGrade);

module.exports = router;