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

module.exports = router;