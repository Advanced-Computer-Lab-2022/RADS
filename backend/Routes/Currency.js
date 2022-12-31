const express = require('express');
const { getRate, getCurrencyFront } = require('../Controllers/currencyController');

const router = express.Router();

router.get('/', getRate);
router.post('/', getCurrencyFront);

module.exports = router;