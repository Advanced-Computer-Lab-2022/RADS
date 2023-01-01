const express = require('express');
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");
const { postAdmin, postCTrainee, postInstructor, editAdmin, getAdmins, getAdmin } = require('../Controllers/adminController');

const router = express.Router();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.ADMIN),
    getAdmins);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  getAdmin
);

router.post('/addadmin',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.ADMIN),
    postAdmin);

router.post('/addctrainee',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.ADMIN),
    postCTrainee);

router.post('/addinstructor',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.ADMIN),
    postInstructor);

router.patch('/editadmin/:id',
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.ADMIN),
    editAdmin);

module.exports = router;