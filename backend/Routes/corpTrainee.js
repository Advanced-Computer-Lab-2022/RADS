const express = require('express');
const { getCTrainees, updatePassword, postCourseRegister, getCTrainee } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.get('/', getCTrainees);
router.get('/:id', getCTrainee);
router.patch('/password/:id', updatePassword);

module.exports = router;