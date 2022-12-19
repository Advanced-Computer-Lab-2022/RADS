const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getCTrainees, updatePassword, postCourseRegister, getCTrainee, getCTraineeCourses, checkHaveAccess, checkCourseProgress, findExamGrade, findExercisesGrade, checkExercisesSolvingStatus, checkSolvingStatus, updateExercisesGrade, updateSolvedExercises, updateCourseProgress, updateSolvedExam, updateExamGrade } = require('../Controllers/corpTraineeController');
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

router.post('/checkaccess/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    checkHaveAccess);

router.post('/courseprogress/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    checkCourseProgress);

router.post('/findgrade/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    findExercisesGrade);

router.post('/findtestgrade/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    findExamGrade);

router.post('/checkexstatus/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    checkExercisesSolvingStatus);

router.post('/checkstatus/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    checkSolvingStatus);

router.post('/updateexamgrade/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    updateExamGrade);

router.post('/updateexercisesgrade/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    updateExercisesGrade);

router.post('/updateexercisesstatus/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    updateSolvedExercises);

router.post('/updateprogress/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    updateCourseProgress);

router.post('/updateexamstatus/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    updateSolvedExam);

module.exports = router;