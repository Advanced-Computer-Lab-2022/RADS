const express = require("express");
const {
    SignUp,
    Login
} = require("../Controllers/guestController");
const router = express.Router();
const passport = require("passport");
const { ROLES, inRole } = require("../security/RoleMiddleware");

router.post("/signup", SignUp);
router.post("/login", Login);

module.exports = router;