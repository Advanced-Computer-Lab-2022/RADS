const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getCTrainees, updatePassword, postCourseRegister, getCTrainee, postGrade, getCTraineeCourses, login, logout } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.get('/',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.CORP_TRAINEE),
getCTrainees);

router.get('/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.CORP_TRAINEE),
getCTrainee);

router.get('/getcourses/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.CORP_TRAINEE),
getCTraineeCourses);

router.patch('/password/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.CORP_TRAINEE),
updatePassword);

router.post('/register/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.CORP_TRAINEE),
postCourseRegister);

router.post('/grade/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.CORP_TRAINEE),
postGrade);

router.get('/', getCTrainees);
router.get('/:id', getCTrainee);
router.get('/getcourses/:id', getCTraineeCourses);
router.patch('/password/:id', updatePassword);
router.post('/register/:id', postCourseRegister);
router.post('/login', login);
router.get('/logout', logout);
router.post('/checkaccess/:id', checkHaveAccess);
router.post('/courseprogress/:id', checkCourseProgress);
router.post('/findgrade/:id', findExercisesGrade);
router.post('/findtestgrade/:id', findExamGrade);
router.post('/checkexstatus/:id', checkExercisesSolvingStatus);
router.post('/checkstatus/:id', checkSolvingStatus);
router.post('/updateexamgrade/:id', updateExamGrade);
router.post('/updateexercisesgrade/:id', updateExercisesGrade);
router.post('/updateexercisesstatus/:id', updateSolvedExercises);
router.post('/updateprogress/:id', updateCourseProgress);
router.post('/updateexamstatus/:id', updateSolvedExam);
module.exports = router;