import { Link } from "@mui/material";
import { useState,useEffect } from "react"


const AdminAccess = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const corpTraineeId = params.get('corptraineeId');
    const requestId = params.get('requestId');
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
        const response = await fetch(`/corptrainee/${corpTraineeId}`);
        const json = await response.json();
        if (response.ok) {
            setCorpTrainee(json);
        }
    }

    const performAccess = async()=>{
        let courseGrade = 0;
        let courseProgress = 0;
        const info = { courseId,courseGrade,courseProgress };
        const response = await fetch(`/corptrainee/register/${corpTraineeId}`, {
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
        performAccess();
        performDelete();
        setHtml("Access Approved Successfully.");
    }


    const handleReject = (e) =>{
        e.preventDefault();
        performDelete();
        setHtml("Access Declined.")
    }

    return (
        <div>
            <h3><strong>Request Information:</strong></h3>
            <div>
            <p>Corporate Trainee Name: {corpTrainee.firstName} {corpTrainee.lastName}</p>
            <p>Course Name: {course.courseTitle} </p>
            <p>{corpTrainee.firstName}'s reason for the access request:{request.corpTraineeComment}</p>
            <p>Request Type: {request.requestType} Request</p>
            </div>
            <button onClick={handleAccept}>Grant Access</button>
            <button onClick={handleReject}>Block Access</button>
            <p>{html}</p>
        </div>
    )
}


export default AdminAccess;