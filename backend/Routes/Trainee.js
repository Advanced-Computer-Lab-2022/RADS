const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getTrainees, updatePassword, postCourseRegister, getTrainee, getTraineeCourses, postTrainee, forgotPassword, postCourseGrade, findOldGrade, postCreditCard, checkRegistered, signUp, login, logout } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
getTrainees);

router.get('/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
getTrainee);

router.get('/getcourses/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
getTraineeCourses);

router.patch('/password/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
updatePassword);

router.post('/add',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
postTrainee);

router.post('/register/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
postCourseRegister);

router.post('/findgrade/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
findExercisesGrade);

router.post('/findtestgrade/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
findExamGrade);

router.post('/forgot/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
forgotPassword);

router.post('/addcredit/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
postCreditCard);

router.post('/checkregister/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE, ROLES.ADMIN),
checkRegistered);

router.post('/updatebalance/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateTraineeBalance);

router.post('/updateprogress/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateCourseProgress);

router.post('/courseprogress/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
checkCourseProgress);

router.post('/updateexamstatus/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateSolvedExam);

router.post('/updateexamgrade/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateExamGrade);

router.post('/updateexercisesgrade/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateExercisesGrade);

router.post('/updateexercisesstatus/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateSolvedExercises);

router.post('/refund/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
refundCourse);

router.post('/checkstatus/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
checkSolvingStatus);

router.post('/checkexstatus/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
checkExercisesSolvingStatus);

router.post('/findcreditcard/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
findCreditCard);

router.post('/deletecard/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
checkRegistered);

router.post('/updatebalance/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateTraineeBalance);

router.post('/updateprogress/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateCourseProgress);

router.post('/courseprogress/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
checkCourseProgress);

router.post('/updateexamstatus/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateSolvedExam);

router.post('/updateexamgrade/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateExamGrade);

router.post('/updateexercisesgrade/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateExercisesGrade);

router.post('/updateexercisesstatus/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
updateSolvedExercises);

router.post('/refund/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
refundCourse);

router.post('/checkstatus/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
checkSolvingStatus);

router.post('/checkexstatus/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
checkExercisesSolvingStatus);

router.post('/findcreditcard/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
findCreditCard);

router.post('/deletecard/:id', 
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
deleteCreditCard);

module.exports = router;