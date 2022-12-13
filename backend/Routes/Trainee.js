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

router.post('/update/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
postCourseGrade);

router.post('/findgrade/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.TRAINEE),
findOldGrade);

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

module.exports = router;