import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const CorpTraineeSubmitAccess = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const corpTraineeId = params.get('corpTraineeId');
    const [course, setCourse] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [corpTraineeComment, setCorpTraineeComment] = useState("");
    const [html, setHtml] = useState("");



    useEffect(() => {
        const fetchCourse = async() => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchCorpTrainee();
            }
        }
        fetchCourse();
    }, [])


    const fetchCorpTrainee = async() => {
        const response = await fetch(`/corptrainee/${corpTraineeId}`);
        const json = await response.json();
        if (response.ok) {
            setCorpTrainee(json);
        }
    }

    const fetchInstructor = async(instID) => {
        const response = await fetch(`/instructor/${instID}`);
        const json = await response.json();
        if (response.ok) {
            setinstructorName(json.firstName + " " + json.lastName);
        }
    }


    const handleAccessRequest = async() => {
        let requestType = "Access";
        console.log(corpTraineeComment);
        const body = { corpTraineeId, corpTraineeComment, courseId, requestType }
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
            setHtml("Request Sent Successfully!");
            setCorpTraineeComment('');
        }
    }

    const handleAccess = (e) => {
        e.preventDefault();
        handleAccessRequest();
    }

    return (
       <div>
        <h1><bold><strong>Access Form</strong></bold></h1>
        <form onSubmit={handleAccess}>
            <p><strong>Course <strong>{course.courseTitle}</strong></strong></p>
            <label>Enter a reason why you would like to access the Course.</label>
            <input type="text" value={corpTraineeComment} onChange={(e) => setCorpTraineeComment(e.target.value)}></input>
            <button>Send</button>
        </form>
        <p><strong>{html}</strong></p>
    </div>
    )
}

export default CorpTraineeSubmitAccess;