const express = require('express');
const { getCTrainees } = require('../Controllers/corpTraineeController');
const router = express.Router();

router.get('/', getCTrainees);

module.exports = router;