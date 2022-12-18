// import axios from 'axios';
import { useState,useEffect } from 'react';
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

const TraineeRating =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const traineeId = params.get('traineeId');
    const courseId = params.get('courseId');
    const corpTraineeId = null;
    const [course,setCourse] = useState([]);
    const [trainee,setTrainee] = useState([]);
    const [cReview,setCReview] = useState('');
    const [cRating,setCRating] = useState(0);
    const [iReview,setIReview] = useState('');
    const [iRating,setIRating] = useState(0);
    const [instructorName,setinstructorName] = useState([]);
    const [instructorId,setInstructorId] = useState('');
    const [error1,setError1] = useState(null);
    const [error2,setError2] = useState(null);
    useEffect(()=>{
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            console.log(json);
            if(response.ok){
                setCourse(json);
                fetchInstructor(json.instructor); 
                fetchTrainee();
                setInstructorId(json.instructor);
            }
        }
        fetchCourse();
    }, [])
    
const fetchInstructor = async (instID) => {
    const response = await fetch(`/instructor/${instID}`);
    const json = await response.json();
    if(response.ok){
        setinstructorName(json.firstName+" "+json.lastName);
    }
}
    const fetchTrainee = async () => {
        const response = await fetch(`/trainee/${traineeId}`);
        const json = await response.json();
        if(response.ok){
            setTrainee(json);
        }
    }


    const submitReviewInstructor = async (e) =>{
        e.preventDefault() 
        const review = {iRating,iReview,traineeId,corpTraineeId};
        console.log("here", JSON.stringify(review));
        console.log("here", review);
        console.log("inst id", course.instructor);
        const response = await fetch(`/instructor/review/${instructorId}`,{
            method:'POST',
            body: JSON.stringify(review),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok){
            setError1(json.error);
        }
        if(response.ok){    
            setIReview('');
            setIRating(0);
            console.log("New review Added for Instructor", json);
            //refresh page on successful submission
            window.location.reload();
        }
        
    }
    const submitReviewCourse = async (e) =>{
        e.preventDefault() 
        const review = {cRating,cReview,traineeId,corpTraineeId};
        const response = await fetch(`/course/review/${courseId}`,{
            method:'POST',
            body: JSON.stringify(review),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok){
            setError2(json.error);
        }
        if(response.ok){    
            setCReview('');
            setCRating(0);
            console.log("New review Added for Course ", json);
            //refresh page on successful submission
            window.location.reload();
        }
    }
    

return(
    <div>
          <div key = {course._id}>
          <h4>Course: {course.courseTitle} </h4>        
        <p><strong>Rating of the course: </strong>{course.courseRating} Out of 5</p>
        <form className='rating-instructor' onSubmit={submitReviewInstructor}>
        <label>Enter your rating on instructor: {instructorName}</label>                
                
                <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Instructor Rating</Typography>
      <Rating
        name="simple-controlled"
        value={iRating}
        onChange={(event, newValue) => {
            if(newValue === null){
                newValue = 0;
            }
            console.log("rating:",newValue); 
          setIRating(newValue);
        }}
      />
          </Box>
                <label>Enter a review on instructor: {instructorName}</label>
                <input type="text" onChange={(e) => setIReview(e.target.value)} value = {iReview}></input>
                <button>Submit</button>
            </form>
            <form className='rating-course' onSubmit={submitReviewCourse}>
            <label>Enter a rating on the course:</label>
            
            <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Course Rating</Typography>
      <Rating
        name="simple-controlled"
        value={cRating}
        onChange={(event, newValue) => {
            if(newValue === null){
                newValue = 0;
            }
            setCRating(newValue);
        }}
      />
      
    </Box>  
                <label>Enter a review on the course:</label>
                <input type="text" onChange={(e) => setCReview(e.target.value)} value = {cReview}></input>
                <button>Submit</button>
            </form>

            <div><strong>Course Exercises: </strong> {course.courseExercises && course.courseExercises.map((exercise)=>(
                <div>
                <p>Question: {exercise.question}</p>
                
                </div>
             ))}</div>
            <p><strong>============================================================================================================</strong></p>
                </div>
            
    </div>
)
}


export default TraineeRating;