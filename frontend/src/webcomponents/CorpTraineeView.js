import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const CorpTraineeView = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const corpTraineeId = params.get('corpTraineeId');
    const [course, setCourse] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [corptraineeCourses, setCorpTraineeCourses] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [exists,setExists] = useState(false);
 
    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchCorpTrainee();
                incrementViews();
            }
        }
        fetchCourse();
    }, [])

    const fetchCorpTrainee = async () => {
        const response = await fetch(`/corptrainee/${corpTraineeId}`);
        const json = await response.json();
        if (response.ok) {
            setCorpTrainee(json);
            setCorpTraineeCourses(json.courses);
        }
    }

    const fetchInstructor = async (instID) => {
        const response = await fetch(`/instructor/${instID}`);
        const json = await response.json();
        if (response.ok) {
            setinstructorName(json.firstName + " " + json.lastName);
        }
    }
    
    const incrementViews = async () => {
        const response = await fetch(`/course/updateviews/${courseId}`, {
            method: 'PATCH',
            body: JSON.stringify({}),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (!response.ok) {
            console.log("error happened:", json.error);
        }
        if (response.ok) {
            console.log("course view incremented", json);
            //refresh page on successful submission
        }
    }

    const findAccessed = async () => {
        const info = { courseId };
        const response = await fetch(`/corptrainee/checkaccess/${corpTraineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            setExists(json);
        }
    }
        
    const CheckHaveAccess = () => {
        findAccessed();
        if (exists) {
            return (<div>
                <p><bold>Enrolled</bold></p>
                <button onClick={() => window.location.href = `/corptraineecourse?courseId=${courseId}&corpTraineeId=${corpTraineeId}`}>Go to course</button>
            </div>)
        }
        else {
            return (
                <div>
                   {<button onClick={() => window.location.href = `/corptraineesubmitaccess?courseId=${courseId}&corpTraineeId=${corpTraineeId}`} key={courseId}>Request Access for <strong>{course.courseTitle}</strong></button>}
                </div>
            )
        }
    }

    return (
        <div>
            <h4>The information of course: {course.courseTitle} </h4>
            <div>
                <CheckHaveAccess />
            </div>
            <ReactPlayer sandbox="allow-presentation" loop={false} className='react-player' url={course.coursePreview} width='20%' height='100%' controls={true}/>
            <div><strong>Course Subtitles: </strong> {course.subtitles && course.subtitles.map((subtitle) => (
                <div>
                    <p>{subtitle.subTitle}</p>
                    <p>Description:{subtitle.description}</p>
                    <p>Total Hours of the Chapter: {subtitle.hours}</p>
                </div>
            ))}</div>
            <p><strong>Instructor of the course: </strong>{instructorName}</p>
            <p><strong>Total Hours of the course: </strong>{course.totalHours} Hours</p>
            <div><strong>Course Exercises: </strong> {course.courseExercises && course.courseExercises.map((exercise) => (
                <div>
                    <p>Question: {exercise.question}</p>
                </div>
            ))}</div>
            <p><strong>============================================================================================================</strong></p>
        </div>
    )
}



export default CorpTraineeView;