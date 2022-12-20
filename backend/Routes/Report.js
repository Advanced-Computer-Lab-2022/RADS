const express = require('express');
const { getRequest, getRefundRequests, getAccessRequests, postRequest, deleteRequest, getReportedCoursesCorpTrainee, getReportedCoursesInstructor, getReportedCoursesTrainee, updateRequest, postCommentCorpTrainee, postCommentTrainee, postCommentInstructor, getCorpTraineeResolvedRequests, getCorpTraineeUnresolvedRequests, getInstructorResolvedRequests, getInstructorUnresolvedRequests, getTraineeResolvedRequests, getTraineeUnresolvedRequests } = require('../Controllers/reportController');

const router = express.Router();

router.get("/request/:id", getRequest)
router.get("/requests/refund", getRefundRequests);
router.get("/requests/access", getAccessRequests);
router.post("/postrequest", postRequest);
router.delete("/deleterequest/:id", deleteRequest);
router.get("/getcoursereportscorp/:id", getReportedCoursesCorpTrainee);
router.get("/getcoursereportsinst/:id", getReportedCoursesInstructor);
router.get("/getcoursereportstrainee/:id", getReportedCoursesTrainee);
router.patch("/updaterequest/:id", updateRequest);
router.post("/traineepostcomment/:id", postCommentTrainee);
router.post("/corptraineepostcomment/:id", postCommentCorpTrainee);
router.post("/instructorpostcomment/:id", postCommentInstructor);


router.get("/getinstructorunresolved/:id", getInstructorUnresolvedRequests)
router.get("/getinstructorresolved/:id", getInstructorResolvedRequests)
router.get("/getcorptraineeunresolved/:id", getCorpTraineeUnresolvedRequests)
router.get("/getcorptraineeresolved/:id", getCorpTraineeResolvedRequests)
router.get("/gettraineeunresolved/:id", getTraineeUnresolvedRequests)
router.get("/gettraineeresolved/:id", getTraineeResolvedRequests)





module.exports = router;