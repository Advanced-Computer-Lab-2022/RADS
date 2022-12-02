const express = require('express');
const { getTrainees, updatePassword, signUp,login,logout } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/', getTrainees);
router.patch('/password/:id', updatePassword);
router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;