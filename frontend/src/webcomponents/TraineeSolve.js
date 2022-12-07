// import axios from 'axios';
import { useState, useEffect } from 'react';




const TraineeSolve = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const traineeId = params.get('traineeId');
    const courseId = params.get('courseId');
    const corpTraineeId = null;
    const [course, setCourse] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [instructorId, setInstructorId] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [resultValues, setResultValues] = useState([]);
    const [courseGrade, setCourseGrade] = useState(0);
    const [oldGrade,setOldGrade] = useState(0);
    const [choices,setChoices] = useState([]);
    const [grades,setGrades] = useState([]);
    const [corrects,setCorrects] = useState([]);



    useEffect(() => {
        const fetchCourse = async() => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchTrainee();
                setExercises(json.courseExercises);
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
    const fetchTrainee = async() => {
        const response = await fetch(`/trainee/${traineeId}`);
        const json = await response.json();
        if (response.ok) {
            setTrainee(json);
        }
    }


const handleChoice = (e) =>{
    var updatedAnswers = [...choices, e.target.value];
    console.log(updatedAnswers);
    setChoices(updatedAnswers);
}

//const handleChoice = ({ target: { value } }) => setChoices([...choices, value])

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
    const response = await fetch(`/trainee/update/${traineeId}`,{
        method:'POST',
        body: JSON.stringify(info),
        headers:{
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
      // setChoices([]);
      // setCorrects([]);
      // setCourseGrade(0);
      // setGrades([]);
      console.log("Done");
    }  
}

const handleSubmit = (e) =>{
    e.preventDefault();
    ShowGrades();
}

const updateGrade = async() => {
  console.log(courseGrade);
 
};

    return ( 
        <div>
       <div className='quiz-form'>
        <h1>Quiz</h1>
 <form onSubmit={handleSubmit}>
{exercises && exercises.map((exercise,index)=>(
    <div>
    <p><strong>Exercise {index+1}: {exercise.question}</strong></p>
    <label><input type = 'radio' value = {exercise.firstChoice} name = {exercise.firstChoice} onChange={e=>{handleChoice(e)}}/> {exercise.firstChoice}</label>
    <label><input type = 'radio' value = {exercise.secondChoice} name = {exercise.secondChoice} onChange={e=>{handleChoice(e)}}/>{exercise.secondChoice}</label>
    <label><input type = 'radio' value = {exercise.thirdChoice} name = {exercise.thirdChoice} onChange={e=>{handleChoice(e)}}/>{exercise.thirdChoice}</label>
    <label><input type = 'radio' value = {exercise.fourthChoice} name = {exercise.fourthChoice} onChange={e=>{handleChoice(e)}}/>{exercise.fourthChoice}</label>
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


export default TraineeSolve;