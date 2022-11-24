const express = require('express');
const { getCTrainees, updatePassword } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.get('/', getCTrainees);
router.patch('/password/:id', updatePassword);

module.exports = router;