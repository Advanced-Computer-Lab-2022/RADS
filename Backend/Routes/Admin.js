const express = require('express');
const { postAdmin } = require('../Controllers/adminController');

const router = express.Router();

router.post('/add', postAdmin);

module.exports = router;