import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import TextField from '@mui/material/TextField';

const CorpTraineeCourse = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const corpTraineeId = params.get('corpTraineeId');
    const [course, setCourse] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [corpTraineeCourses, setCorpTraineeCourses] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [exists, setExists] = useState(false);
    const [balanceHtml, setBalanceHtml] = useState("");
    const [currentProgress, setCurrentProgress] = useState(0);
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [showNotes, setShowNotes] = useState(false);
    const [buttonText, setButtonText] = useState("View Notes");
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
                fetchCorpTrainee();
                findCurrentProgress();
                getAllNotes();
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




    const findCurrentProgress = async () => {
        const info = { courseId }
        const response = await fetch(`/corptrainee/courseprogress/${corpTraineeId}`, {
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
        const response = await fetch(`/corptrainee/updateprogress/${corpTraineeId}`, {
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
    const postNewNote = async () => {
        const info = { courseId, note };
        console.log(info);
        const response = await fetch(`/corptrainee/postnote/${corpTraineeId}`, {
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

    const getAllNotes = async () => {
        const info = { courseId };
        console.log(info);
        const response = await fetch(`/corptrainee/getnotes/${corpTraineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            setNotes(json);
            console.log(json);
        }
    }

    const subSubmit = (e) => {
        e.preventDefault();
        postNewNote();
    }
    const handleNoteClick = (e) => {
        e.preventDefault();
        if (showNotes === true) {
            setShowNotes(false);
            setButtonText("View Notes");
        }
        else {
            setShowNotes(true);
            setButtonText("Close")
        }

    }

    return (
        <div>
            <div className='wallet-div'>
                <h1><strong>Welcome back, current course progress is {currentProgress}%,{currentProgress === 100 ? (<p>Congratulations on finishing the Course.</p>)
                    : (<p>Keep going, ur doing great.</p>)}</strong></h1>
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
            <form onSubmit={subSubmit}>
                <TextField value={note} label="Enter a note" onChange={(e) => setNote(e.target.value)} placeholder="Ex: Priority Inversion is when two...."></TextField>
                <button type="submit">Add note</button>
            </form>

            {showNotes && <div>
                <p>Your Notes</p>
                {notes && notes.map((note, index1) => (
                    <div>
                        <p>Note {index1 + 1}: {note.note}</p>
                    </div>
                ))}
            </div>
            }

            <button onClick={handleNoteClick}>{buttonText}</button>


            <button onClick={() => window.location.href = `/corptraineerating?corpTraineeId=${corpTraineeId}&courseId=${courseId}`}>Rate Course</button>
            <button onClick={() => window.location.href = `/corptraineesolve?corpTraineeId=${corpTraineeId}&courseId=${courseId}`}>Solve Exercises</button>
            <button onClick={() => window.location.href = `/corptraineexam?corpTraineeId=${corpTraineeId}&courseId=${courseId}`}>Solve Final Exam</button>
        </div>
    )
}

export default CorpTraineeCourse;