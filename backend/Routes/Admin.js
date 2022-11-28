const express = require('express');
const { postAdmin, postCTrainee, postInstructor, editAdmin, getAdmins } = require('../Controllers/adminController');

const router = express.Router();

router.get('/', getAdmins);
router.post('/addAdmin', postAdmin);
router.post('/addCTrainee', postCTrainee);
router.post('/addInstructor', postInstructor);
router.patch('/editAdmin/:id', editAdmin);

module.exports = router;