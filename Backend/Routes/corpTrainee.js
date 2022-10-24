const express = require('express');
const { postCTrainee } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.post('/add', postCTrainee);

module.exports = router;