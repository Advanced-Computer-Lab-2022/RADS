const express = require("express");
const {
    SignUp,
    Login,
    Test,
    Admin,
} = require("../Controllers/guestController");
const router = express.Router();
const passport = require("passport");
//const { ROLES, inRole } = require("../security/Rolemiddleware");
//const { AddProfile, FindAllProfiles, FindSingleProfile, DeleteProfile } = require("../controllers/profileControllers");

/* guest routes. */
router.post("/signup", SignUp);
router.post("/login", Login);

// /* add profile route */
// router.post("/profiles",
//     passport.authenticate("jwt", { session: false }),
//     AddProfile);
// /* get all profiles */
// router.get("/profiles",
//     passport.authenticate("jwt", { session: false }),
//     inRole(ROLES.ADMIN),
//     FindAllProfiles);
// /* get one profiles */
// router.get("/profile",
//     passport.authenticate("jwt", { session: false }),
//     FindSingleProfile);
// /* delete profiles */
// router.delete("/profiles/:id",
//     passport.authenticate("jwt", { session: false }),
//     inRole(ROLES.ADMIN),
//     DeleteProfile);

module.exports = router;