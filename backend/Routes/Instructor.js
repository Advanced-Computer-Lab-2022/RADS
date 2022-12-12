const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { getInstructor, getInstructors, deleteInstructor, updateInstructor, postInstructor, postInstructorReview, getInstructorRating, forgotPassword, updatePassword,login,logout } = require('../Controllers/instructorController');
const router = express.Router();

// GET all instructors info
router.get('/',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
getInstructors);

// GET a single instructor's info 
router.get('/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
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
inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
updateInstructor);

// UPDATE password
router.patch('/password/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
updatePassword);

//router.post('/addPromotion/:id', addPromotion);   

// POST a new Review
router.post('/review/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
postInstructorReview);

// GET a single Course's rating 
router.get('/rating/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
getInstructorRating);

router.post('/forgot/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.INSTRUCTOR, ROLES.ADMIN),
forgotPassword);


module.exports = router;