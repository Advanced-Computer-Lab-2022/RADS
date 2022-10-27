const express = require('express');
const { postCTrainee } = require('../Controllers/adminController');
const { getCTrainees } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.post('/add', postCTrainee);
router.get('/', getCTrainees);

module.exports = router;