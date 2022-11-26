const express = require('express');
const { getTrainees, updatePassword } = require('../Controllers/traineeController');
const router = express.Router();

router.get('/', getTrainees);
router.patch('/password/:id', updatePassword);

module.exports = router;