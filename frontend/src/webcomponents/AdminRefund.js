import { Link } from "@mui/material";
import { useState,useEffect} from "react"


const AdminRefund = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    const [refundRequests, setRefundRequests] = useState([]);
    const [accessRequests, setAccessRequests] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
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
                console.log(json.courseProgress);
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
        const response = await fetch(`/trainee/${traineeId}`);
        const json = await response.json();
        if (response.ok) {
            setTrainee(json);
        }
    }

    const performRefund = async()=>{
        const info = { courseId };
        const response = await fetch(`/trainee/refund/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
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

    const performDelete = async()=>{
        const response = await fetch(`/report/deleterequest/${requestId}`, {
            method: 'DELETE',
        })
        const json = await response.json();
        if (response.ok) {
            console.log(json);
        }
    }


    const handleAccept = (e) =>{
        e.preventDefault();
        performRefund();
        performDelete();
        setHtml("Refund Approved Successfully.");
    }


    const handleReject = (e) =>{
        e.preventDefault();
        performDelete();
        setHtml("Refund Declined.")
    }

    return (
        <div>
            <h3><strong>Request Information:</strong></h3>
            <div>
            <p>Trainee Name: {trainee.firstName} {trainee.lastName}</p>
            <p>Course Name: {course.courseTitle} </p>
            <p>Current progress: {request.courseProgress}%</p>
            <p>Amount of money to be refunded: {Math.ceil(request.refundAmout*rateVal)} {currencyVal}</p>
            <p>{trainee.firstName}'s reason for refund:{request.traineeComment}%</p>
            <p>Request Type: {request.requestType} Request</p>
            </div>
            <button onClick={handleAccept}>Accept Refund</button>
            <button onClick={handleReject}>Reject Refund</button>
            <p>{html}</p>
        </div>
    )
}



export default AdminRefund;