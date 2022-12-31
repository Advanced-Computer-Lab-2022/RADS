import { useState,useEffect } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Button } from "@mui/material";

const CourseCreate = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const decode = jwt_decode(token);
    const instructorId = decode.id;
    const [courseTitle, setCourseTitle] = useState('');
    const [subtitles, setSubtitles] = useState([{ subTitle: "", description: "", videoLink: "", hours: "" }]);
    const [price, setPrice] = useState('');
    const [shortSummary, setShortSummary] = useState('');
    const [subject, setSubject] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [courseExercises, setCourseExercises] = useState([{ question: "", firstChoice: "", secondChoice: "", thirdChoice: "", fourthChoice: "", answer: "" }]);
    const [exam, setExam] = useState([{ question: "", firstChoice: "", secondChoice: "", thirdChoice: "", fourthChoice: "", answer: "" }]);
    const [coursePreview, setCoursePreview] = useState('');
    const [error, setError] = useState(null);
    const [instructorName,setinstructorName] = useState("");

    useEffect(() => {
        const fetchInstructor = async () => {
            axios
                .get(`/instructor/${instructorId}`)
                .then((res) => {
                    setinstructorName(res.data.firstName + " " + res.data.lastName);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchInstructor();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault() //prevent form submission   
        let instructor = instructorId;
        const course = { courseTitle, subtitles, price, shortSummary, subject, totalHours, instructor,instructorName, courseExercises, exam, coursePreview };
        const response = await fetch('/course/add', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setCourseTitle('');
            setSubtitles([{ subTitle: "", description: "", videoLink: "", hours: "" }]);
            setPrice('');
            setShortSummary('');
            setSubject('');
            setTotalHours('');
            setCourseExercises([{ question: "", firstChoice: "", secondChoice: "", thirdChoice: "", fourthChoice: "", answer: "" }]);
            setExam([{ question: "", firstChoice: "", secondChoice: "", thirdChoice: "", fourthChoice: "", answer: "" }]);
            setCoursePreview('');
            setError(null);
            console.log("New Course Added", json);
            window.location.reload();
        }
    }

    const handleSubtitleAdd = () => {
        setSubtitles([...subtitles, { subTitle: "", description: "", videoLink: "", hours: "" }])
    }
    const setCourseSubTitle = (e, index) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setSubtitles(list);
    }
    const setCourseSubDesc = (e, index) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setSubtitles(list);
    }
    const setVidLink = (e, index) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setSubtitles(list);
    }
    const setSubHours = (e, index) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setSubtitles(list);
    }


    const handleExerciseAdd = () => {
        setCourseExercises([...courseExercises, { question: "", firstChoice: "", secondChoice: "", thirdChoice: "", fourthChoice: "", answer: "" }])
    }
    const setQuestion = (e, index2) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...courseExercises];
        list[index2][name] = value;
        setCourseExercises(list);
    }
    const setFirstChoice = (e, index2) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...courseExercises];
        list[index2][name] = value;
        setCourseExercises(list);
    }
    const setSecondChoice = (e, index2) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...courseExercises];
        list[index2][name] = value;
        setCourseExercises(list);
    }
    const setThirdChoice = (e, index2) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...courseExercises];
        list[index2][name] = value;
        setCourseExercises(list);
    }

    const setFourthChoice = (e, index2) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...courseExercises];
        list[index2][name] = value;
        setCourseExercises(list);
    }

    const setAnswer = (e, index2) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...courseExercises];
        list[index2][name] = value;
        setCourseExercises(list);
    }

    const handleExamExerciseAdd = () => {
        setExam([...exam, { question: "", firstChoice: "", secondChoice: "", thirdChoice: "", fourthChoice: "", answer: "" }])
    }
    const setEQuestion = (e, index3) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...exam];
        list[index3][name] = value;
        setExam(list);
    }
    const setEFirstChoice = (e, index3) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...exam];
        list[index3][name] = value;
        setExam(list);
    }
    const setESecondChoice = (e, index3) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...exam];
        list[index3][name] = value;
        setExam(list);
    }
    const setEThirdChoice = (e, index3) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...exam];
        list[index3][name] = value;
        setExam(list);
    }

    const setEFourthChoice = (e, index3) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...exam];
        list[index3][name] = value;
        setExam(list);
    }

    const setEAnswer = (e, index3) => {
        const { name, value } = e.target;
        console.log(e.target);
        const list = [...exam];
        list[index3][name] = value;
        setExam(list);
    }


    return (
        <Box>
            <form className="create-course" onSubmit={handleSubmit}>
                <h3>Insert Course Information</h3>

                <label>Course Title:</label>
                <input type="text" onChange={(e) => setCourseTitle(e.target.value)}
                    value={courseTitle}
                />

                <label>Course Preview Video Link: </label>
                <input type="text" onChange={(e) => setCoursePreview(e.target.value)}
                    value={coursePreview}
                />

                <label>Price: </label>
                <input type="number" onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />

                <label>Short summary about the course: </label>
                <input type="text" onChange={(e) => setShortSummary(e.target.value)}
                    value={shortSummary}
                />

                <label>Subject of the course: </label>
                <input type="text" onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                />

                <label>Total Hours of the course: </label>
                <input type="number" onChange={(e) => setTotalHours(e.target.value)}
                    value={totalHours}
                />
                <br></br>

                <Box>
                    <label>Subtitles: </label>
                    {subtitles.map((subtitle, index) => (
                        <Box key={index} className="subtitles">
                            <Box className="add-subtitle">
                                <label>Title :</label>
                                <input name="subTitle" type="text" onChange={(e) => setCourseSubTitle(e, index)}
                                    value={subtitle.subTitle}
                                />

                                <label>Description: </label>
                                <input name="description" type="text" onChange={(e) => setCourseSubDesc(e, index)}
                                    value={subtitle.description}
                                />

                                <label>Video Link: </label>
                                <input name="videoLink" type="text" onChange={(e) => setVidLink(e, index)}
                                    value={subtitle.videoLink}
                                />

                                <           label>Subtitle hours: </label>
                                <input name="hours" type="number" onChange={(e) => setSubHours(e, index)}
                                    value={subtitle.hours}
                                />
                                {subtitles.length - 1 === index &&
                                    (<Button
          variant="contained" type="button" className="add-btn" onClick={handleSubtitleAdd}><span>Add a Subtitle</span></Button>)}
                            </Box>
                        </Box>
                    ))}
                    <br></br>
                </Box>


                <Box>
                    <label>Subtitle Exercises: </label>
                    {courseExercises.map((exercise, index2) => (
                        <Box key={index2} className="exercises">
                            <Box className="add-exercise">
                                <label>Question :</label>
                                <input name="question" type="text" onChange={(e) => setQuestion(e, index2)}
                                    value={exercise.question}
                                />

                                <label>First Choice: </label>
                                <input name="firstChoice" type="text" onChange={(e) => setFirstChoice(e, index2)}
                                    value={exercise.firstChoice}
                                />

                                <label>Second Choice: </label>
                                <input name="secondChoice" type="text" onChange={(e) => setSecondChoice(e, index2)}
                                    value={exercise.secondChoice}
                                />

                                <label>Third Choice: </label>
                                <input name="thirdChoice" type="text" onChange={(e) => setThirdChoice(e, index2)}
                                    value={exercise.thirdChoice}
                                />

                                <label>Fourth Choice: </label>
                                <input name="fourthChoice" type="text" onChange={(e) => setFourthChoice(e, index2)}
                                    value={exercise.fourthChoice}
                                />

                                <label>Answer: </label>
                                <input name="answer" type="text" onChange={(e) => setAnswer(e, index2)}
                                    value={exercise.answer}
                                />


                                {courseExercises.length - 1 === index2 &&
                                    (<Button
          variant="contained" type="button" className="add-btn" onClick={handleExerciseAdd}><span>Add an Exercise</span></Button>)}
                            </Box>
                        </Box>
                    ))}
                </Box>



                <Box>
                    <label>Exam Exercises: </label>
                    {exam.map((exercise, index3) => (
                        <Box key={index3} className="exam=exercises">
                            <Box className="add-exercise">
                                <label>Question :</label>
                                <input name="question" type="text" onChange={(e) => setEQuestion(e, index3)}
                                    value={exercise.question}
                                />

                                <label>First Choice: </label>
                                <input name="firstChoice" type="text" onChange={(e) => setEFirstChoice(e, index3)}
                                    value={exercise.firstChoice}
                                />

                                <label>Second Choice: </label>
                                <input name="secondChoice" type="text" onChange={(e) => setESecondChoice(e, index3)}
                                    value={exercise.secondChoice}
                                />

                                <label>Third Choice: </label>
                                <input name="thirdChoice" type="text" onChange={(e) => setEThirdChoice(e, index3)}
                                    value={exercise.thirdChoice}
                                />

                                <label>Fourth Choice: </label>
                                <input name="fourthChoice" type="text" onChange={(e) => setEFourthChoice(e, index3)}
                                    value={exercise.fourthChoice}
                                />

                                <label>Answer: </label>
                                <input name="answer" type="text" onChange={(e) => setEAnswer(e, index3)}
                                    value={exercise.answer}
                                />


                                {exam.length - 1 === index3 &&
                                    (<Button
          variant="contained" type="button" className="add-btn" onClick={handleExamExerciseAdd}><span>Add an Exercise</span></Button>)}
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Button
          variant="contained">Submit</Button>
                {error && <Box className="error">{error}</Box>}
            </form>

            <p> <strong>____________________________________________________________________________________________</strong></p>
        </Box>
    )
}



export default CourseCreate;