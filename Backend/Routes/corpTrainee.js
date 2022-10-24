const express = require('express');
const corpTrainee = require('../Models/corpTraineeModel');
const { newCTrainee } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.post('/add', function(req, res) {
    newCTrainee
});

module.exports = router;