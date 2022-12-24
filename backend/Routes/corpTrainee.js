const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getCTrainees, updatePassword, getCertificate, checkCertificateState, updateCertificateState, emailPDF, createCertificate, postCourseRegister, getCTrainee, getCTraineeCourses, checkHaveAccess, checkCourseProgress, findExamGrade, findExercisesGrade, checkExercisesSolvingStatus, checkSolvingStatus, updateExercisesGrade, updateSolvedExercises, updateCourseProgress, updateSolvedExam, updateExamGrade, postNote, getCourseNotes } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE, ROLES.ADMIN),
    getCTrainees);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE, ROLES.ADMIN),
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

router.post('/postnote/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    postNote);

router.post('/getnotes/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    getCourseNotes);

router.get('/cert/getpdf',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    getCertificate);

router.post('/checkcertstate/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    checkCertificateState);

router.post('/updatecertstate/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    updateCertificateState);

router.post('/createpdf',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    createCertificate);

router.post('/emailpdf/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.CORP_TRAINEE),
    emailPDF);

module.exports = router;