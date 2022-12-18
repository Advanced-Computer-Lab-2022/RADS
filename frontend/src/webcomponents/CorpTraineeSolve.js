// import axios from 'axios';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
//import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const CorpTraineeSolve = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const corptraineeId = params.get('corptraineeId');
    const courseId = params.get('courseId');
    const corpTraineeId = null;
    const [course, setCourse] = useState([]);
    const [corptrainee,setCorpTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [instructorId, setInstructorId] = useState('');
    const [exercises, setExercises] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [resultValues, setResultValues] = useState([]);
    const [courseGrade, setCourseGrade] = useState(0);
    const [oldGrade,setOldGrade] = useState(0);

    const [choicesChecked,setChoicesChecked] = useState([]);
    const [choices,setChoices] = useState([]);
    const [firstChoices,setFirstChoices] = useState([]);
    const [secondChoices,setSecondChoices] = useState([]);
    const [thirdChoices,setThirdChoices] = useState([]);
    const [fourthChoices,setFourthChoices] = useState([]);
    const [grades,setGrades] = useState([]);
    const [corrects,setCorrects] = useState([]);


    useEffect(() => {
        const fetchCourse = async() => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchCorpTrainee();
                setInstructorId(json.instructor);
            }
        }
        fetchCourse();
    }, [])

    const fetchInstructor = async(instID) => {
        const response = await fetch(`/instructor/${instID}`);
        const json = await response.json();
        if (response.ok) {
            setinstructorName(json.firstName + " " + json.lastName);
        }
    }
    const fetchCorpTrainee = async() => {
        const response = await fetch(`/corptrainee/${corptraineeId}`);
        const json = await response.json();
        if (response.ok) {
            setCorpTrainee(json);
        }
    }
    const handleChoice = (e, exIndex) =>{
        var updatedAnswers = [...choices];
        if (e.target.checked) { 
            updatedAnswers[exIndex] = e.target.value;
          } else {
            updatedAnswers.splice(exIndex,1);
          }
          console.log(updatedAnswers);
          setChoices(updatedAnswers);
    }

const ShowGrades = async() =>{
    let array1 = grades;
    let array2 = corrects;
    let initialGrade = 0;
    for(let i = 0;i<choices.length;i++){
        if(choices[i] === exercises[i].answer){
            array1[i] = 1;
            array2[i] = 'Correct !';
            initialGrade += 1;
        }
        else{
            array1[i] = 0;
            array2[i] = `Incorrect! , correct solution is ${exercises[i].answer}`
        }
    }
    setGrades(array1);
    setCorrects(array2);
    console.log(initialGrade);
    let finalgrade = (initialGrade/choices.length)*100;
    setCourseGrade(finalgrade);
    let courseGrade = finalgrade
    const info = {courseId,courseGrade};
    const response = await fetch(`/corptrainee/update/${corptraineeId}`,{
        method:'POST',
        body: JSON.stringify(info),
        headers:{
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
      console.log("Done");
    }  
}

const handleSubmit = (e) =>{
    e.preventDefault();
    ShowGrades();
}

    return (
        <div>
       <div className='quiz-form'>
        <h1>Quiz</h1>
 <form onSubmit={handleSubmit}>
{exercises && exercises.map((exercise,index)=>(
    <div>
    <fieldset id = {exercise._id}>
    <p><strong>Exercise {index+1}: {exercise.question}</strong></p>
    <label><input id = {`first${index}`} type = 'radio' value = {exercise.firstChoice} name = {exercise.firstChoice} checked = {choices[index] === exercise.firstChoice} onChange={e=>{handleChoice(e,index)}}/> {exercise.firstChoice}</label>
    <label><input id = {`second${index}`} type = 'radio' value = {exercise.secondChoice} name = {exercise.secondChoice} checked = {choices[index]  === exercise.secondChoice} onChange={e=>{handleChoice(e,index)}}/>{exercise.secondChoice}</label>
    <label><input id = {`third${index}`} type = 'radio' value = {exercise.thirdChoice} name = {exercise.thirdChoice} checked = {choices[index] === exercise.thirdChoice} onChange={e=>{handleChoice(e, index)}}/>{exercise.thirdChoice}</label>
    <label><input id = {`forth${index}`} type = 'radio' value = {exercise.fourthChoice} name = {exercise.fourthChoice} checked = {choices[index] === exercise.fourthChoice} onChange={e=>{handleChoice(e, index)}}/>{exercise.fourthChoice}</label>
    </fieldset>
    </div>
 ))}
 <button type='submit'>Submit</button>
</form>
       </div >
       <div className='solution-form'>
       {grades && grades.map((grade,index)=>(
            <p>Q{index+1} Grade: {grade} out of 1</p>
             ))}
       {corrects && corrects.map((correct,index)=>(
            <p>A1{index+1}: {correct}</p>
             ))}
        <p><strong>Total Grade: {courseGrade}</strong></p>
       </div>
       </div>
    )
}


export default CorpTraineeSolve;