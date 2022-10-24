const express = require('express');
const Admin = require('../Models/adminModel');
const { postAdmin } = require('../Controllers/adminController');

const router = express.Router();

router.post('/add', function(req, res) {
    postAdmin
});

module.exports = router;