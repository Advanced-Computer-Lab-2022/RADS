const express = require('express');
const { getCTrainees, updatePassword, postCourseRegister, getCTrainee, login, logout } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.get('/', getCTrainees);
router.get('/:id', getCTrainee);
router.patch('/password/:id', updatePassword);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;