// import axios from 'axios';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
//import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';



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
    const [grade, setGrade] = useState(0);
    const [end, setEnd] = useState(false);
    const [overAllGrade, setOverAllGrade] = useState(0);
    const [answer, setAnswer] = useState('');


    useEffect(() => {
        const fetchCourse = async() => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            console.log(json);
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


    

    // const handleChange = async(event) => {
    //     setSelectedValue(event.target.value);
    //     console.log(event.target.value);
    //     let courseGrade;
    //     const info = {courseId,courseGrade};
    //     const response = await fetch(`/trainee/update/${traineeId}`,{
    //         method:'POST',
    //         body: JSON.stringify(info),
    //         headers:{
    //             "Access-Control-Allow-Origin": "*",
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     if(response.ok){
           
    //     }  
    //   };


    const handleChange = async(event) => {
        var updatedSelectedValues = [...selectedValues];
        var updatedResultValues = [...resultValues];
        var updatedGrade = grade;
        updatedSelectedValues.push(event.target.value);
        setSelectedValues(updatedSelectedValues);
        for(let i = 0;i<selectedValues.length;i++){
            console.log("selected value",selectedValues[i]);
              if(selectedValues[i] === exercises[i].answer){             
                 updatedResultValues[i] = 1;
                 updatedGrade+= 1;
                 console.log("grade1",updatedGrade);
              }
              else{
                 updatedResultValues[i] = 0;
              }
            }
            console.log("grade2",updatedGrade);
            setResultValues(updatedResultValues);
            setGrade(updatedGrade);
         if(selectedValues.length === exercises.length){
              updatedGrade = Math.floor((grade/selectedValues.length)*100); 
              setGrade(updatedGrade);
              setEnd(true);
         }  
  }

  const handleSubmit = async(event) => {
    console.log(grade); 
    setOverAllGrade(grade);
    console.log(overAllGrade);
};
    
    //  const filterMethodOnSubject = (event) => {
    //     var updatedSubList = [...checkedSubjects];
    //     let subjects = courses.filter((item)=>
    //     newKeys.some((key)=>item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase())));
    //     if (event.target.checked) { 
    //       updatedSubList = [...checkedSubjects].concat(subjects);
    //     } else {
    //       console.log(updatedSubList.length);
    //       for(let i = 0;i<updatedSubList.length;i++){
    //         if(updatedSubList[i]["subject"] === event.target.value){
    //           console.log(updatedSubList[i]["subject"] +" at "+ i);
    //           updatedSubList.splice(i, 1);
    //           i--;
    //         }
    //       } 
    //     }
    //     setCheckedSubjects(updatedSubList);
    //   };
  

    return ( 
        <div>
         <FormControl onChange={handleSubmit}>
           <FormLabel id="demo-controlled-radio-buttons-group"> </FormLabel>
             {exercises && exercises.map((exercise)=>(
              <div>
              <p>Question: {exercise.question}</p>
              <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" >
                  <FormControlLabel  value={exercise.firstChoice} control={<Radio /> } label={exercise.firstChoice}  onChange={handleChange} />
                  <FormControlLabel  value={exercise.secondChoice} control={<Radio />} label={exercise.secondChoice} onChange={handleChange} />
                  <FormControlLabel  value={exercise.thirdChoice} control={<Radio />} label={exercise.thirdChoice}  onChange={handleChange}/>
                  <FormControlLabel  value={exercise.fourthChoice} control={<Radio />} label={exercise.fourthChoice}  onChange={handleChange}/>
              </RadioGroup>
              </div>
             ))}
               <button>Submit</button>
          </FormControl>
          <p>OVERALL GRADE: {overAllGrade}</p>
        </div>
    )
}


export default TraineeSolve;