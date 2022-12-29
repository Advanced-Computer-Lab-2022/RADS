// import axios from 'axios';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const CorpTraineeSolve = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const corpTraineeId = params.get('corpTraineeId');
    const courseId = params.get('courseId');
    const [course, setCourse] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [instructorId, setInstructorId] = useState('');
    const [exercisesGradeFinal, setExercisesGradeFinal] = useState(0);
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
                setExercises(json.courseExercises);
                setInstructorId(json.instructor);
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
    

    const updateSolvingStatus = async () => {
        const info = { courseId };
        axios
        .post(`/corptrainee/updateexercisesstatus/${corpTraineeId}`, info)
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
        .post(`/corptrainee/checkexstatus/${corpTraineeId}`, info)
        .then((res) => {
            setStatus(res.data)
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

    
    const handleEnding = async () => {
        // const 
        let currentChapter = course.subtitles.length + 1
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
            if (choices[i] === exercises[i].answer) {
                array1[i] = 1;
                array2[i] = 'Correct !';
                initialGrade += 1;
            }
            else {
                array1[i] = 0;
                array2[i] = `Incorrect! , correct solution is ${exercises[i].answer}`
            }
        }
        setGrades(array1);
        setCorrects(array2);
        setSolved(true);
        console.log(array1);
        console.log(array2);
        console.log(initialGrade);
        let finalgrade = ((initialGrade / choices.length) * 100) * 0.5;
        setExercisesGradeFinal(finalgrade);
        console.log(finalgrade);
        let exercisesGrade = finalgrade
        const info = { courseId, exercisesGrade };
        axios
        .post(`/corptrainee/updateexercisesgrade/${corpTraineeId}`, info)
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
        updateSolvingStatus();
        handleEnding();
        ShowGrades();
    }


    return (
        <Box>
            {status && status === true ? (<Box><p><strong>Already Solved the course exercises</strong></p>
                <p><strong>Exercises Grade was: {Math.ceil(oldExercisesGrade * 2)}%</strong></p></Box>)
                : (
                    <Box>
                        <Box className='quiz-form'>
                            <h1>Subtitle Exercises:</h1>
                            <form onSubmit={handleSubmit}>
                                {exercises && exercises.map((exercise, index) => (
                                    <Box> <fieldset id={exercise._id}>
                                        <p><strong>Exercise {index + 1}: {exercise.question}</strong></p>
                                        <label><input id={`first${index}`} type='radio' value={exercise.firstChoice} name={exercise.firstChoice} checked={choices[index] === exercise.firstChoice} onChange={e => { handleChoice(e, index) }} /> {exercise.firstChoice}</label>
                                        <label><input id={`second${index}`} type='radio' value={exercise.secondChoice} name={exercise.secondChoice} checked={choices[index] === exercise.secondChoice} onChange={e => { handleChoice(e, index) }} />{exercise.secondChoice}</label>
                                        <label><input id={`third${index}`} type='radio' value={exercise.thirdChoice} name={exercise.thirdChoice} checked={choices[index] === exercise.thirdChoice} onChange={e => { handleChoice(e, index) }} />{exercise.thirdChoice}</label>
                                        <label><input id={`forth${index}`} type='radio' value={exercise.fourthChoice} name={exercise.fourthChoice} checked={choices[index] === exercise.fourthChoice} onChange={e => { handleChoice(e, index) }} />{exercise.fourthChoice}</label>
                                    </fieldset>
                                    </Box>
                                ))}
                                {showButton && <button id="submit-solve" type='submit'>Submit</button>}
                            </form>
                        </Box >
                        <Box className='solution-form'>
                            {solved && grades && grades.map((grade, index2) => (
                                <p>Q{index2 + 1}: {grade} out of 1</p>
                            ))}
                            {solved && corrects && corrects.map((correct, index3) => (
                                <p>A{index3 + 1}: {correct}</p>
                            ))}
                            <p><strong>Exercises Grade: {Math.ceil(exercisesGradeFinal * 2)}%</strong></p>
                        </Box>
                    </Box>)}
        </Box>
    )
}


export default CorpTraineeSolve;