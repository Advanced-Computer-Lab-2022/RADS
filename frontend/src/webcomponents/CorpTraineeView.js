import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { Box } from "@mui/material";

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
        axios
            .get(`/corptrainee/${corpTraineeId}`)
            .then((res) => {
                setCorpTrainee(res.data);
            setCorpTraineeCourses(res.data.courses);
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
        axios
        .post(`/corptrainee/checkaccess/${corpTraineeId}`, info)
        .then((res) => {
            setExists(res.data);
        })
        .catch((error) => {
            console.error(error)
        })
    }
        
    const CheckHaveAccess = () => {
        findAccessed();
        if (exists) {
            return (<Box>
                <p><bold>Enrolled</bold></p>
                <button onClick={() => window.location.href = `/corptraineecourse?courseId=${courseId}&corpTraineeId=${corpTraineeId}`}>Go to course</button>
            </Box>)
        }
        else {
            return (
                <Box>
                   {<button onClick={() => window.location.href = `/corptraineesubmitaccess?courseId=${courseId}&corpTraineeId=${corpTraineeId}`} key={courseId}>Request Access for <strong>{course.courseTitle}</strong></button>}
                </Box>
            )
        }
    }

    return (
        <Box>
            <h4>The information of course: {course.courseTitle} </h4>
            <Box>
                <CheckHaveAccess />
            </Box>
            <ReactPlayer sandbox="allow-presentation" loop={false} className='react-player' url={course.coursePreview} width='20%' height='100%' controls={true}/>
            <Box><strong>Course Subtitles: </strong> {course.subtitles && course.subtitles.map((subtitle) => (
                <Box>
                    <p>{subtitle.subTitle}</p>
                    <p>Description:{subtitle.description}</p>
                    <p>Total Hours of the Chapter: {subtitle.hours}</p>
                </Box>
            ))}</Box>
            <p><strong>Instructor of the course: </strong>{instructorName}</p>
            <p><strong>Total Hours of the course: </strong>{course.totalHours} Hours</p>
            <Box><strong>Course Exercises: </strong> {course.courseExercises && course.courseExercises.map((exercise) => (
                <Box>
                    <p>Question: {exercise.question}</p>
                </Box>
            ))}</Box>
            <p><strong>============================================================================================================</strong></p>
        </Box>
    )
}



export default CorpTraineeView;