// import axios from 'axios';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';

const CorpTraineeExam = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const corpTraineeId = params.get('corpTraineeId');
    const courseId = params.get('courseId');
    const traineeId = null;
    const [course, setCourse] = useState([]);
    const [examExercises, setExamExercises] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [instructorId, setInstructorId] = useState('');
    const [examGradeFinal, setExamGradeFinal] = useState(0);
    const [oldExamGrade, setOldExamGrade] = useState(0);
    const [oldExercisesGrade, setOldExercisesGrade] = useState(0);
    const [choices, setChoices] = useState([]);
    const [grades, setGrades] = useState([]);
    const [corrects, setCorrects] = useState([]);
    const [status, setStatus] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [solved, setSolved] = useState(false);


    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchCorpTrainee();
                setExamExercises(json.exam);
                setInstructorId(json.instructor);
                findExamLastGrade();
                findExercisesLastGrade();
                getSolvingStatus();
            }
        }
        fetchCourse();
    }, [])


    const fetchCorpTrainee = async () => {
        axios
            .get(`/corptrainee/${corpTraineeId}`)
            .then((res) => {
                setCorpTrainee(res.data);
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


    const handleChoice = (e, exIndex) => {
        var updatedAnswers = [...choices];
        if (e.target.checked) {
            updatedAnswers[exIndex] = e.target.value;
        } else {
            updatedAnswers.splice(exIndex, 1);
        }
        console.log(updatedAnswers);
        setChoices(updatedAnswers);
    }

    const findExercisesLastGrade = async () => {
        const info = { courseId };
        axios
        .post(`/corptrainee/findgrade/${corpTraineeId}`, info)
        .then((res) => {
            setOldExercisesGrade(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const updateSolvingStatus = async () => {
        const info = { courseId };
        axios
        .post(`/corptrainee/updateexamstatus/${corpTraineeId}`, info)
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const getSolvingStatus = async () => {
        const info = { courseId };
        axios
        .post(`/corptrainee/checkstatus/${corpTraineeId}`, info)
        .then((res) => {
            setStatus(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }



    const findExamLastGrade = async () => {
        const info = { courseId };
        axios
        .post(`/corptrainee/findtestgrade/${corpTraineeId}`, info)
        .then((res) => {
            setOldExamGrade(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const handleEnding = async () => {
        // const 
        let currentChapter = course.subtitles.length + 2;
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

    const ShowGrades = async () => {
        let array1 = grades;
        let array2 = corrects;
        let initialGrade = 0;
        for (let i = 0; i < choices.length; i++) {
            if (choices[i] === examExercises[i].answer) {
                array1[i] = 1;
                array2[i] = 'Correct !';
                initialGrade += 1;
            }
            else {
                array1[i] = 0;
                array2[i] = `Incorrect! , correct solution is ${examExercises[i].answer}`
            }
        }
        setSolved(true);
        setGrades(array1);
        setCorrects(array2);
        console.log(initialGrade);
        let finalgrade = ((initialGrade / choices.length) * 100) * 0.5;
        setExamGradeFinal(finalgrade);
        let examGrade = finalgrade
        const info = { courseId, examGrade };
        axios
        .post(`/corptrainee/updateexamgrade/${corpTraineeId}`, info)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error(error)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowButton(false);
        handleEnding();
        updateSolvingStatus();
        ShowGrades();
    }


    return (
        <Box>
            {status && status === true ? (<Box><p><strong>Already Solved the exam</strong></p>
                <p><strong>Exam Grade was: {Math.ceil(oldExamGrade * 2)}%</strong></p></Box>)

                : (<Box>
                    <Box className='quiz-form'>
                        <h1>Final Exam:</h1>
                        <form onSubmit={handleSubmit}>
                            {examExercises && examExercises.map((exercise, index) => (
                                <Box> <fieldset id={exercise._id}>
                                    <p><strong>Exercise {index + 1}: {exercise.question}</strong></p>
                                    <label><input id={`first${index}`} type='radio' value={exercise.firstChoice} name={exercise.firstChoice} checked={choices[index] === exercise.firstChoice} onChange={e => { handleChoice(e, index) }} /> {exercise.firstChoice}</label>
                                    <label><input id={`second${index}`} type='radio' value={exercise.secondChoice} name={exercise.secondChoice} checked={choices[index] === exercise.secondChoice} onChange={e => { handleChoice(e, index) }} />{exercise.secondChoice}</label>
                                    <label><input id={`third${index}`} type='radio' value={exercise.thirdChoice} name={exercise.thirdChoice} checked={choices[index] === exercise.thirdChoice} onChange={e => { handleChoice(e, index) }} />{exercise.thirdChoice}</label>
                                    <label><input id={`forth${index}`} type='radio' value={exercise.fourthChoice} name={exercise.fourthChoice} checked={choices[index] === exercise.fourthChoice} onChange={e => { handleChoice(e, index) }} />{exercise.fourthChoice}</label>
                                </fieldset>
                                </Box>
                            ))}
                            {showButton && <Button
          variant="contained" type='submit'>Submit</Button>}
                        </form>
                    </Box >
                    <Box className='solution-form'>
                        {solved && grades && grades.map((grade, index) => (
                            <p>Q{index + 1} Grade: {grade} out of 1</p>
                        ))}
                        {solved && corrects && corrects.map((correct, index) => (
                            <p>A1{index + 1}: {correct}</p>
                        ))}
                        <p><strong>Exam Grade: {Math.ceil(examGradeFinal * 2)}%</strong></p>
                        <p><strong>Total course grade: {Math.ceil(examGradeFinal + oldExercisesGrade)} out of 100</strong></p>
                    </Box>
                </Box>)}
        </Box>
    )
}


export default CorpTraineeExam;