const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getTrainees, updatePassword, getTrainee, postCourseRegister, getCertificate, createCertificate, updateSolvedExercises, emailPDF, checkExercisesSolvingStatus, checkSolvingStatus, getTraineeCourses, postTrainee, deleteCreditCard, forgotPassword, findExercisesGrade, postCreditCard, checkRegistered, updateCourseProgress, checkCourseProgress, refundCourse, updateTraineeBalance, updateSolvedExam, updateExamGrade, updateExercisesGrade, findExamGrade, findCreditCard, getCourseNotes, postNote, checkCertificateState, updateCertificateState } = require('../Controllers/traineeController');
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
    inRole(ROLES.TRAINEE, ROLES.ADMIN),
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

router.post('/postnote/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.TRAINEE),
    postNote);

router.post('/getnotes/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.TRAINEE),
    getCourseNotes);


router.post('/emailpdf/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.TRAINEE),
    emailPDF);

router.post('/checkcertstate/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.TRAINEE),
    checkCertificateState);

router.post('/updatecertstate/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.TRAINEE),
    updateCertificateState);

router.get('/cert/getpdf',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.TRAINEE),
    getCertificate);

router.post('/createpdf',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.TRAINEE),
    createCertificate);


module.exports = router;