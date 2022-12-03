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
    const [courses,setCourses] = useState([]);
    const [trainee,setTrainee] = useState([]);
    const [instructorName,setinstructorName] = useState([]);


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
        
        const response = await fetch('/trainee/postCourseRegister',{
            method:'POST',
            body: JSON.stringify(courseId),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
    } 
return(
    <div>
          <h4>The information of course: {course.courseTitle} </h4>
          <button onClick={registerCourse}>Register Course</button>
          <div><strong>Course Subtitles: </strong> {course.subtitles && course.subtitles.map((subtitle)=>(
                <div>
                <p>{subtitle.subTitle}</p>
                <p>Description:{subtitle.description}</p>
                <p>Total Hours of the Chapter: {subtitle.hours}</p>
                <iframe width="600" height="315" title="Video Summary" src={subtitle.videoLink} frameBorder="0" allowFullScreen></iframe> 
                </div>
             ))}</div>
            <p><strong>Price: </strong>{course.price*rateVal}{" "}{currencyVal}</p>
            <p><strong>Short Summary about the Course: </strong>{course.shortSummary}</p>
            <p><strong>Subject of the course: </strong>{course.subject}</p>
            <p><strong>Instructor of the course: </strong>{instructorName}</p>
            {/* <p><strong>Rating of the course: </strong>{course.courseRating.rating/course.courseRating.ratersCount} Out of 5</p> */}
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