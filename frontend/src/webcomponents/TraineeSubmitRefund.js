import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



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
    const [refundAmount,setRefundAmount] = useState(0);



    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchTrainee();
                findCurrentProgress();
                setRefundAmount(json.price);
            }
        }
        fetchCourse();
    }, [])


    const fetchTrainee = async () => {
        const response = await fetch(`/trainee/${traineeId}`);
        const json = await response.json();
        if (response.ok) {
            setTrainee(json);
            setTraineeCourses(json.courses);
            setTraineeBalance(json.balance);
        }
    }

    const fetchInstructor = async (instID) => {
        const response = await fetch(`/instructor/${instID}`);
        const json = await response.json();
        if (response.ok) {
            setinstructorName(json.firstName + " " + json.lastName);
        }
    }



    const findCurrentProgress = async () => {
        const info = { courseId }
        const response = await fetch(`/trainee/courseprogress/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            setCourseProgress(json);
        }
    }




    const sendRefundRequest = async () => {
        let requestType = "Refund";
        const body = { traineeId, traineeComment, courseId, courseProgress,refundAmount ,requestType }
        console.log(body);
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
            console.log(json);
            setHtml("Refund Request Sent Successfully!");
        }
    }

    const handleRefund = (e) => {
        e.preventDefault();
        sendRefundRequest();
    }

    return (
        <div>
            <h1><bold><strong>Refund Form</strong></bold></h1>
            <form onSubmit={handleRefund}>
                <p><strong>Course: {course.courseTitle}</strong></p>
                <p><strong>Refund Amount: {Math.ceil(course.price*rateVal)} {currencyVal}</strong></p>
                <label>Enter a reason why you would like to refund the Course.</label>
                <input type="text" value={traineeComment} onChange={(e) => setTraineeComment(e.target.value)}></input>
                <button>Refund</button>
            </form>
            <p><strong>{html}</strong></p>
        </div>
    )
}

export default TraineeSubmitRefund;