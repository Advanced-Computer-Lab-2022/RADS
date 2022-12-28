import { Link } from "@mui/material";
import { useState, useEffect } from "react"
import axios from "axios";

const AdminAccess = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const corpTraineeId = params.get('corptraineeId');
    const requestId = params.get('requestId');
    const adminId = params.get('adminId');
    const [course, setCourse] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [request, setRequest] = useState([]);
    const [html, setHtml] = useState('');

    useEffect(() => {
        const fetchRequest = async () => {
            const response = await fetch(`/report/request/${requestId}`);
            const json = await response.json();
            if (response.ok) {
                setRequest(json);
                fetchCourse();
                fetchCorpTrainee();
            }
        }
        fetchRequest();
    }, [])

    const fetchCourse = async () => {
        const response = await fetch(`/course/${courseId}`);
        const json = await response.json();
        if (response.ok) {
            setCourse(json);
        }
    }
    const fetchCorpTrainee = async () => {
        axios
            .get(`/corptrainee/${corpTraineeId}`)
            .then((res) => {
                setCorpTrainee(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const performAccess = async () => {
        let courseGrade = 0;
        let courseProgress = 0;
        const info = { courseId, courseGrade, courseProgress };
        axios
            .post(`/corptrainee/register/${corpTraineeId}`, info)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }


    const performUpdate = async (text) => {
        let reportStatus = text;
        let update = {reportStatus};
        const response = await fetch(`/report/updaterequest/${requestId}`, {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            console.log(json);
        }
    }

    const handleAccept = (e) => {
        e.preventDefault();
        performAccess();
        performUpdate('Refund Accepted, resolved');
        setHtml("Access Approved Successfully.");
    }

    const handleReject = (e) => {
        e.preventDefault();
        performUpdate('Refund Rejected, resolved');
        setHtml("Access Declined.")
    }

    return (
        <div>
            <h3><strong>Request Information:</strong></h3>
            <div>
                <p>Corporate Trainee Name: {corpTrainee.firstName} {corpTrainee.lastName}</p>
                <p>Course Name: {course.courseTitle} </p>
                <p>{corpTrainee.firstName}'s reason/reasons for accessing the course:
                    {request.corpTraineeComments && request.corpTraineeComments.map((comment, index3) => (
                        <p>Reason {index3 + 1}: {comment.corpTraineeComment}</p>
                    ))}
                </p>
                <p>Request Type: {request.requestType} Request</p>
            </div>
            <button onClick={handleAccept}>Grant Access</button>
            <button onClick={handleReject}>Block Access</button>
            <p>{html}</p>
        </div>
    )
}


export default AdminAccess;