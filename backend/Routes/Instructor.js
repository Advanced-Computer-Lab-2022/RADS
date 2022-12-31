const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getInstructor, getInstructors, deleteInstructor, updateInstructor, postInstructor, postInstructorReview, forgotPassword, updatePassword, updateInstructorBalance } = require('../Controllers/instructorController');
const router = express.Router();

// GET all instructors info
router.get('/',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
    getInstructors);

// GET a single instructor's info 
router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR, ROLES.TRAINEE, ROLES.CORP_TRAINEE),
    getInstructor);

// Post an instructor
router.get('/add',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
    postInstructor);

// DELETE an instructor
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
    deleteInstructor);


// UPDATE instructor
router.patch('/changeInfo/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR),
    updateInstructor);

// UPDATE password
router.patch('/password/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR),
    updatePassword);

//router.post('/addPromotion/:id', addPromotion);   

// POST a new Review
router.post('/review/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR, ROLES.TRAINEE, ROLES.CORP_TRAINEE),
    postInstructorReview);



// POST forget password 
router.post('/forgot/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR),
    forgotPassword);


// POST forget password 
router.post('/updatebalance/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.INSTRUCTOR, ROLES.TRAINEE, ROLES.CORP_TRAINEE, ROLES.ADMIN),
    updateInstructorBalance);


module.exports = router;