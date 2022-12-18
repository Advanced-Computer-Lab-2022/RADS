import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const CorpTraineeView = (props) =>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    console.log(courseId);
    const corptraineeId = params.get('corptraineeId');
    const [course,setCourse] = useState([]);
    const [corptrainee,setCorpTrainee] = useState([]);
    const [corptraineeCourses,setCorpTraineeCourses] = useState([]);
    const [instructorName,setinstructorName] = useState([]);

           
useEffect(()=>{
    const fetchCourse = async () => {
        const response = await fetch(`/course/${courseId}`);
        const json = await response.json();
        if(response.ok){
            setCourse(json);
            fetchInstructor(json.instructor);
            fetchCorpTrainee();
        }
    }
    fetchCourse();
}, [])

const fetchCorpTrainee = async () => {
    const response = await fetch(`/corptrainee/${corptraineeId}`);
    const json = await response.json();
    if(response.ok){
        setCorpTrainee(json);
        setCorpTraineeCourses(json.courses);
    }
}

const fetchInstructor = async (instID) => {
    const response = await fetch(`/instructor/${instID}`);
    const json = await response.json();
    if(response.ok){
        setinstructorName(json.firstName+" "+json.lastName);
    }
}
const registerCourse = async () =>{
    let courseGrade = 0;
    const info = {courseId,courseGrade};
    const response = await fetch(`/corptrainee/register/${corptraineeId}`,{
        method:'POST',
        body: JSON.stringify(info),
        headers:{
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        window.location.reload();
    }  
} 

const CheckRegistered = () =>{
    let exists = false;
   for(let i = 0; i<corptraineeCourses.length;i++){
    if(corptraineeCourses[i].courseId === courseId){
        exists = true;
        break;
    }
   }
   if(exists){
    <p><bold>Registered</bold></p>
   } 
   else{
    return(
        <button  onClick={registerCourse} key = {courseId}>Register in Course <strong>{course.courseTitle}</strong></button>
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



export default CorpTraineeView;