// import axios from 'axios';
import { useState, useEffect } from 'react';

const TraineeExam = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const traineeId = params.get('traineeId');
    const courseId = params.get('courseId');
    const corpTraineeId = null;
    const [course, setCourse] = useState([]);
    const [examExercises, setExamExercises] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [instructorId, setInstructorId] = useState('');
    const [examGradeFinal, setExamGradeFinal] = useState(0);
    const [oldExamGrade, setOldExamGrade] = useState(0);
    const [oldExercisesGrade, setOldExercisesGrade] = useState(0);


    const [choicesChecked, setChoicesChecked] = useState([]);
    const [choices, setChoices] = useState([]);
    const [firstChoices, setFirstChoices] = useState([]);
    const [secondChoices, setSecondChoices] = useState([]);
    const [thirdChoices, setThirdChoices] = useState([]);
    const [fourthChoices, setFourthChoices] = useState([]);
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
                fetchTrainee();
                setExamExercises(json.exam);
                setInstructorId(json.instructor);
                findExamLastGrade();
                findExercisesLastGrade();
                getSolvingStatus();
            }
        }
        fetchCourse();
    }, [])

    const fetchInstructor = async (instID) => {
        const response = await fetch(`/instructor/${instID}`);
        const json = await response.json();
        if (response.ok) {
            setinstructorName(json.firstName + " " + json.lastName);
        }
    }
    const fetchTrainee = async () => {
        const response = await fetch(`/trainee/${traineeId}`);
        const json = await response.json();
        if (response.ok) {
            setTrainee(json);
        }
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
        const response = await fetch(`/trainee/findgrade/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            setOldExercisesGrade(json)
        }
    }

    const updateSolvingStatus = async () => {
        const info = { courseId };
        const response = await fetch(`/trainee/updateexamstatus/${traineeId}`, {
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

    const getSolvingStatus = async () => {
        const info = { courseId };
        const response = await fetch(`/trainee/checkstatus/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            setStatus(json)
        }
    }



    const findExamLastGrade = async () => {
        const info = { courseId };
        const response = await fetch(`/trainee/findtestgrade/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            setOldExamGrade(json)
        }
    }

    const handleEnding = async () => {
        // const 
        let currentChapter = course.subtitles.length + 2;
        let totalChapters = course.subtitles.length + 2;
        const info = { courseId, currentChapter, totalChapters }
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
        const response = await fetch(`/trainee/updateexamgrade/${traineeId}`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            console.log("Done");
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowButton(false);
        handleEnding();
        updateSolvingStatus();
        ShowGrades();
    }


    return (
        <div>
            {status && status === true ? (<div><p><strong>Already Solved the exam</strong></p>
                <p><strong>Exam Grade was: {Math.ceil(oldExamGrade * 2)}%</strong></p></div>)

                : (<div>
                    <div className='quiz-form'>
                        <h1>Final Exam:</h1>
                        <form onSubmit={handleSubmit}>
                            {examExercises && examExercises.map((exercise, index) => (
                                <div> <fieldset id={exercise._id}>
                                    <p><strong>Exercise {index + 1}: {exercise.question}</strong></p>
                                    <label><input id={`first${index}`} type='radio' value={exercise.firstChoice} name={exercise.firstChoice} checked={choices[index] === exercise.firstChoice} onChange={e => { handleChoice(e, index) }} /> {exercise.firstChoice}</label>
                                    <label><input id={`second${index}`} type='radio' value={exercise.secondChoice} name={exercise.secondChoice} checked={choices[index] === exercise.secondChoice} onChange={e => { handleChoice(e, index) }} />{exercise.secondChoice}</label>
                                    <label><input id={`third${index}`} type='radio' value={exercise.thirdChoice} name={exercise.thirdChoice} checked={choices[index] === exercise.thirdChoice} onChange={e => { handleChoice(e, index) }} />{exercise.thirdChoice}</label>
                                    <label><input id={`forth${index}`} type='radio' value={exercise.fourthChoice} name={exercise.fourthChoice} checked={choices[index] === exercise.fourthChoice} onChange={e => { handleChoice(e, index) }} />{exercise.fourthChoice}</label>
                                </fieldset>
                                </div>
                            ))}
                            {showButton && <button type='submit'>Submit</button>}
                        </form>
                    </div >
                    <div className='solution-form'>
                        {solved && grades && grades.map((grade, index) => (
                            <p>Q{index + 1} Grade: {grade} out of 1</p>
                        ))}
                        {solved && corrects && corrects.map((correct, index) => (
                            <p>A1{index + 1}: {correct}</p>
                        ))}
                        <p><strong>Exam Grade: {Math.ceil(examGradeFinal * 2)}%</strong></p>
                        <p><strong>Total course grade: {Math.ceil(examGradeFinal + oldExercisesGrade)} out of 100</strong></p>
                    </div>
                </div>)}
        </div>
    )
}


export default TraineeExam;