import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";


const TraineeSubmitRefund = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
    const [course, setCourse] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [traineeCourses, setTraineeCourses] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [traineeBalance, setTraineeBalance] = useState(0);
    const [exists, setExists] = useState(false);
    const [balanceHtml, setBalanceHtml] = useState("");
    const [courseProgress, setCourseProgress] = useState(0);
    const [traineeComment, setTraineeComment] = useState("");
    const [html, setHtml] = useState("");
    const [refundAmount, setRefundAmount] = useState(0);



    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchTrainee();
                findCurrentProgress();
                console.log(json.price);
                setRefundAmount(json.price);
            }
        }
        fetchCourse();
    }, [])


    const fetchTrainee = async () => {
        axios
            .get(`/trainee/${traineeId}`)
            .then((res) => {
                setTrainee(res.data);
                setTraineeCourses(res.data.courses);
                setTraineeBalance(res.data.balance);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const fetchInstructor = async (instID) => {
        axios
            .get(`/instructor/${instID}`)
            .then((res) => {
                setinstructorName(res.data.firstName + " " + res.data.lastName);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const findCurrentProgress = async () => {
        const info = { courseId }
        axios
            .post(`/trainee/courseprogress/${traineeId}`, info)
            .then((res) => {
                setCourseProgress(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const sendRefundRequest = async () => {
        let requestType = "Refund";
        const body = { traineeId, courseId, courseProgress, refundAmount, requestType };
        const response = await fetch(`/report/postrequest`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            postComment(json);
        }
    }

    const postComment = async (reportId) => {
        const body = { traineeComment }
        const response = await fetch(`/report/traineepostcomment/${reportId}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            setHtml("Refund Request Sent Successfully!");
        }
    }

    const handleRefund = (e) => {
        e.preventDefault();
        sendRefundRequest();
    }

    return (
        <Box>
            <h1><bold><strong>Refund Form</strong></bold></h1>
            <form onSubmit={handleRefund}>
                <p><strong>Course: {course.courseTitle}</strong></p>
                <p><strong>Refund Amount: {Math.ceil(course.price * rateVal)} {currencyVal}</strong></p>
                <label>Enter a reason why you would like to refund the Course.</label>
                <input type="text" value={traineeComment} onChange={(e) => setTraineeComment(e.target.value)}></input>
                <Button
          variant="contained">Refund</Button>
            </form>
            <p><strong>{html}</strong></p>
        </Box>
    )
}

export default TraineeSubmitRefund;