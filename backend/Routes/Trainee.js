const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getTrainees, updatePassword, postCourseRegister, getTrainee, getTraineeCourses, postTrainee, forgotPassword, postCourseGrade, findOldGrade, postCreditCard, checkRegistered, signUp, login, logout } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
getTrainees);

router.get('/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
getTrainee);

router.get('/getcourses/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
getTraineeCourses);

router.patch('/password/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updatePassword);

router.post('/add',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
postTrainee);

router.post('/register/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
postCourseRegister);

router.post('/findgrade/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
findExercisesGrade);

router.post('/findtestgrade/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
findExamGrade);

router.post('/forgot/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
forgotPassword);

router.post('/addcredit/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
postCreditCard);

router.post('/checkregister/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
checkRegistered);
router.post('/updatebalance/:id', updateTraineeBalance);
router.post('/updateprogress/:id', updateCourseProgress);
router.post('/courseprogress/:id', checkCourseProgress);
router.post('/updateexamstatus/:id', updateSolvedExam);
router.post('/updateexamgrade/:id', updateExamGrade);
router.post('/updateexercisesgrade/:id', updateExercisesGrade);
router.post('/updateexercisesstatus/:id', updateSolvedExercises);
router.post('/refund/:id', refundCourse);
router.post('/checkstatus/:id', checkSolvingStatus);
router.post('/checkexstatus/:id', checkExercisesSolvingStatus);
router.post('/findcreditcard/:id', findCreditCard);
router.post('/deletecard/:id', deleteCreditCard);


module.exports = router;