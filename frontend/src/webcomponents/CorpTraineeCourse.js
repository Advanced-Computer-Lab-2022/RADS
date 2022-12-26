import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import TextField from '@mui/material/TextField';
import axios from "axios";
import jsPDF from 'jspdf';
import { Button } from "@mui/material";
import { saveAs } from 'file-saver';

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
                fetchCorpTrainee(json.courseTitle);
                getAllNotes();
            }
        }
        fetchCourse();
    }, [])


    const fetchCorpTrainee = async (courseTitle) => {
        axios
            .get(`/corptrainee/${corpTraineeId}`)
            .then((res) => {
                setCorpTrainee(res.data);
                setCorpTraineeCourses(res.data.courses);
                createCertificate(res.data.firstName, res.data.lastName, courseTitle)
                findCurrentProgress(courseTitle, res.data.email, res.data.firstName, res.data.lastName);
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

    const fetchCertificateState = async (courseTitle, email) => {
        const info = { courseId }
        axios
            .post(`/corptrainee/checkcertstate/${corpTraineeId}`, info)
            .then((res) => {
                sendCompletionEmail(res.data, courseTitle, email,);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const sendCompletionEmail = async (state, courseTitle, email) => {
        if (state === false) {
            let courseName = courseTitle;
            const info = { email, courseName }
            axios
                .post(`/corptrainee/emailpdf/${corpTraineeId}`, info)
                .then((res) => {

                    updateCertificateState();
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    const createCertificate = async (firstName, lastName, courseTitle) => {
        let name = firstName + ' ' + lastName;
        let body = { name, courseTitle };
        axios.post('/corptrainee/createpdf', body)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const updateCertificateState = async () => {
        const info = { courseId }
        axios
            .post(`/corptrainee/updatecertstate/${corpTraineeId}`, info)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const findCurrentProgress = async (courseTitle, email, firstName, lastName) => {
        const info = { courseId }
        axios
            .post(`/corptrainee/courseprogress/${corpTraineeId}`, info)
            .then((res) => {
                setCurrentProgress(res.data);
                if (res.data === 100) {
                    fetchCertificateState(courseTitle, email, firstName, lastName);
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const handleEnding = async (index) => {
        let currentChapter = index + 1;
        let totalChapters = course.subtitles.length + 2;
        const info = { courseId, currentChapter, totalChapters }
        axios
            .post(`/corptrainee/updateprogress/${corpTraineeId}`, info)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const postNewNote = async () => {
        const info = { courseId, note };
        axios
            .post(`/corptrainee/postnote/${corpTraineeId}`, info)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const getAllNotes = async () => {
        const info = { courseId };
        axios
            .post(`/corptrainee/getnotes/${corpTraineeId}`, info)
            .then((res) => {
                setNotes(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
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

    const handleDownloadNotes = (e) => {
        e.preventDefault();
        var doc = new jsPDF('landscape', 'px', 'a4', 'false');
        doc.text(90, 60, `Notes for Course ${course.courseTitle}`)
        let x = 60
        let y = 80
        for (let i = 1; i < notes.length; i++) {
            doc.text(x, y, `Note ${i}: ${notes[i].note}`);
            y += 20;
        }
        doc.setFont('Helvertica', 'bold');
        doc.save('Notes.pdf');
    }

    const generatePDF = async (e) => {
        e.preventDefault();
        axios
            .get(`/corptrainee/cert/getpdf`, { responseType: 'blob' })
            .then((res) => {
                const blob = new Blob([res.data], { type: 'application/pdf' })
                saveAs(blob, "certificate.pdf")
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div>
            <div className='wallet-div'>
                <h1><strong>Welcome back, current course progress is {currentProgress}%,{currentProgress === 100 ? (
                    <div>
                        <p>Congratulations on finishing the Course.</p>
                        <Button variant="contained" onClick={generatePDF}>Download Certificate</Button>
                    </div>)
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
            <button onClick={handleDownloadNotes}>Download Notes</button>
            <button onClick={() => window.location.href = `/corptraineerating?corpTraineeId=${corpTraineeId}&courseId=${courseId}`}>Rate Course</button>
            <button onClick={() => window.location.href = `/corptraineesolve?corpTraineeId=${corpTraineeId}&courseId=${courseId}`}>Solve Exercises</button>
            <button onClick={() => window.location.href = `/corptraineexam?corpTraineeId=${corpTraineeId}&courseId=${courseId}`}>Solve Final Exam</button>
        </div>
    )
}

export default CorpTraineeCourse;