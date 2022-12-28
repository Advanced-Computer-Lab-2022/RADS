import { Link } from "@mui/material";
import { useState, useEffect } from "react"
import axios from "axios";

const AdminRefund = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
    const adminId = params.get('adminId');
    const requestId = params.get('requestId');
    const [course, setCourse] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [request, setRequest] = useState([]);
    const [html, setHtml] = useState('');

    useEffect(() => {
        const fetchRequest = async () => {
            const response = await fetch(`/report/request/${requestId}`);
            const json = await response.json();
            if (response.ok) {
                setRequest(json);
                fetchCourse();
                fetchTrainee();
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
    const fetchTrainee = async () => {
        axios
            .get(`/trainee/${traineeId}`)
            .then((res) => {
                setTrainee(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const performRefund = async () => {
        const info = { courseId };
        axios
            .post(`/trainee/refund/${traineeId}`, info)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const performUpdateInstBalance = async () => {
        let balanceValue = -(course.price - course.price * 0.1);
        const info = { balanceValue };
        axios
            .post(`/instructor/updatebalance/${course.instructor}`, info)
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
        performRefund();
        performUpdate('Refund Accepted, resolved');
        performUpdateInstBalance();
        setHtml("Refund Approved Successfully.");
    }


    const handleReject = (e) => {
        e.preventDefault();
        performUpdate('Refund Rejected, resolved');
        setHtml("Refund Declined.")
    }

    return (
        <div>
            <h3><strong>Request Information:</strong></h3>
            <div>
                <p>Trainee Name: {trainee.firstName} {trainee.lastName}</p>
                <p>Course Name: {course.courseTitle} </p>
                <p>Current progress: {request.courseProgress}%</p>
                <p>Amount of money to be refunded: {Math.ceil(request.refundAmount * rateVal)} {currencyVal}</p>
                <p>{trainee.firstName}'s reason/reasons for requesting the refund :
                    {request.traineeComments && request.traineeComments.map((comment, index1) => (
                        <p>Reason {index1 + 1}: {comment.traineeComment}</p>
                    ))}
                </p>
                <p>Request Type: {request.requestType} Request</p>
            </div>
            <button onClick={handleAccept}>Accept Refund</button>
            <button onClick={handleReject}>Reject Refund</button>
            <p>{html}</p>
        </div>
    )
}



export default AdminRefund;