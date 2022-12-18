import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';


const TraineeCourse = (props) => {
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
    const [currentProgress, setCurrentProgress] = useState(0);

    // const todayDate = new Date();
    // console.log(todayDate);
    // console.log(json.promotionEndDate);
    // const promoend = new Date(json.promotionEndDate);
    // console.log("course end date: ",promoend);
    // console.log("today date: ",todayDate);
    // console.log("here ",promoend > todayDate);

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchTrainee();
                findCurrentProgress();
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

    const handleClick = (e) => {
        e.preventDefault();
        let x = `Balance: ${Math.ceil(traineeBalance * rateVal)} ${currencyVal}`;
        setBalanceHtml(x);
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
        console.log(json);
        if (response.ok) {
            setCurrentProgress(json);
        }
    }

    const handleEnding = async (index) => {
        let currentChapter = index + 1;
        let totalChapters = course.subtitles.length + 2;
        const info = { courseId, currentChapter, totalChapters }
        console.log(info);
        const response = await fetch(`/trainee/updateprogress/${traineeId}`, {
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




    return (
        <div>
            <div className='wallet-div'>
                <h1><strong>Welcome back, current course progress is {currentProgress}%,{currentProgress === 100 ? (<p>Congratulations on finishing the Course.</p>)
                    : (<p>Keep going, ur doing great.</p>)}</strong></h1>

                {currentProgress && currentProgress > 50 ? (<div><p> </p></div>)
                    : (
                        <button onClick={() => window.location.href = `/traineesubmitrefund?traineeId=${traineeId}&courseId=${courseId}`}><strong>Request Refund</strong></button>
                    )}
                <div>
                    <button onClick={handleClick}><strong>Wallet</strong></button>
                    <p>{balanceHtml}</p>
                </div>
            </div>
            <h4>Welcome to course: {course.courseTitle} </h4>
            <p><strong>Total Hours of the course: </strong>{course.totalHours} Hours</p>
            {course.subtitles && course.subtitles.map((subtitle, index) => (
                <div>
                    <p>Subtitle: {subtitle.subTitle}</p>
                    <p>Description:{subtitle.description}</p>
                    <p>Total Hours of the Chapter: {subtitle.hours}</p>
                    <ReactPlayer sandbox="allow-presentation" loop={false} className='react-player' url={subtitle.videoLink} width='20%' height='100%' controls={true} onEnded={async () => (handleEnding(index))} />
                    <br />
                </div>
            ))}
            <button onClick={() => window.location.href = `/traineerate?traineeId=${traineeId}&courseId=${courseId}`}>Rate Course</button>
            <button onClick={() => window.location.href = `/traineesolve?traineeId=${traineeId}&courseId=${courseId}`}>Solve Exercises</button>
            <button onClick={() => window.location.href = `/traineexam?traineeId=${traineeId}&courseId=${courseId}`}>Solve Final Exam</button>
        </div>
    )
}

export default TraineeCourse;