const express = require("express");
const {
    SignUp,
    Login,
    CreateAdmin,
    CreateInstructor,
    CreateCorpTrainee,
    ForgetPassword,
    ChangePassword
} = require("../Controllers/guestController");
const router = express.Router();
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/create/admin", CreateAdmin);
router.post("/create/instructor", CreateInstructor);
router.post("/create/corptrainee", CreateCorpTrainee);
router.post("/guest/forgotpassword", ForgetPassword);
router.post("/guest/changepassword", ChangePassword);

module.exports = router;