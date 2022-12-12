const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { postAdmin, postCTrainee, postInstructor, editAdmin, getAdmins, login, logout } = require('../Controllers/adminController');

const router = express.Router();

router.get('/',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.ADMIN),
getAdmins);

router.post('/addAdmin',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.ADMIN),
postAdmin);

router.post('/addCTrainee',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.ADMIN),
postCTrainee);

router.post('/addInstructor',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.ADMIN),
postInstructor);

router.patch('/editAdmin/:id',
passport.authenticate('jwt', { session: false }),
inRole(ROLES.ADMIN),
editAdmin);

module.exports = router;