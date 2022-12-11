// import axios from 'axios';
import { useState,useEffect } from 'react';

const TraineeView =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
    const [course,setCourse] = useState([]);
    const [trainee,setTrainee] = useState([]);
    const [traineeCourses,setTraineeCourses] = useState([]);
    const [instructorName,setinstructorName] = useState([]);
    const [exists,setExists] = useState(false);
    // const todayDate = new Date();
    // console.log(todayDate);
    // console.log(json.promotionEndDate);
    // const promoend = new Date(json.promotionEndDate);
    // console.log("course end date: ",promoend);
    // console.log("today date: ",todayDate);
    // console.log("here ",promoend > todayDate);

    useEffect(()=>{
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if(response.ok){
                setCourse(json);
                fetchInstructor(json.instructor); 
                fetchTrainee();

            }
        }
        fetchCourse();
    }, [])

  
    const fetchTrainee = async () => {
        const response = await fetch(`/trainee/${traineeId}`);
        const json = await response.json();
        if(response.ok){
            setTrainee(json);
            setTraineeCourses(json.courses);
        }
    }

        const fetchInstructor = async (instID) => {
        const response = await fetch(`/instructor/${instID}`);
        const json = await response.json();
        if(response.ok){
            setinstructorName(json.firstName+" "+json.lastName);
        }
    }


    const findRegistered = async() =>{
        const info = {courseId};
        const response = await fetch(`/trainee/checkregister/${traineeId}`,{
            method:'POST',
            body: JSON.stringify(info),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(response.ok){
            setExists(json);
        }  
    }
    const CheckRegistered = () =>{
       findRegistered();
       if(exists){
        return( <div>
        <p><bold>Registered</bold></p>
        </div>)
       } 
       else{
        return(
            <div>
            <button  onClick={() => window.location.href=`/traineeoptions?courseId=${courseId}&traineeId=${traineeId}`} key = {courseId}>Register in Course <strong>{course.courseTitle}</strong></button>
            </div>
        )
       }
    } 
return(
    <div>
           <h4>The information of course: {course.courseTitle} </h4>
    <div><CheckRegistered /></div>
    <iframe width="600" height="315" title="Course preview" src={course.coursePreview} frameBorder="0" allowFullScreen></iframe> 
    <div><strong>Course Subtitles: </strong> {course.subtitles && course.subtitles.map((subtitle)=>(
          <div>
          <p>{subtitle.subTitle}</p>
          <p>Description:{subtitle.description}</p>
          <p>Total Hours of the Chapter: {subtitle.hours}</p>
          </div>
       ))}</div>
      <p><strong>Price: </strong>{course.price*rateVal}{" "}{currencyVal}</p>
      <p><strong>Instructor of the course: </strong>{instructorName}</p>
      <p><strong>Total Hours of the course: </strong>{course.totalHours} Hours</p>
      <div><strong>Course Exercises: </strong> {course.courseExercises && course.courseExercises.map((exercise)=>(
          <div>
          <p>Question: {exercise.question}</p>
          </div>
       ))}</div>
      <p><strong>============================================================================================================</strong></p>
    </div>
)
}


export default TraineeView;