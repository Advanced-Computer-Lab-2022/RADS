const express = require('express');
const { getRequest, getRefundRequests, getAccessRequests, postRequest, deleteRequest } = require('../Controllers/reportController');

const router = express.Router();

router.get("/request/:id", getRequest)
router.get("/requests/refund", getRefundRequests);
router.get("/requests/access", getAccessRequests);
router.post("/postrequest", postRequest);
router.delete("/deleterequest/:id", deleteRequest);

module.exports = router;