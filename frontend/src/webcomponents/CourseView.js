// import axios from 'axios';
import { useState,useEffect } from 'react';

const CourseView =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const [course,setCourse] = useState([]);
    const [instructorName,setinstructorName] = useState([]);

           


    useEffect(()=>{
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if(response.ok){
                setCourse(json);
                fetchInstructor(json.instructor); 
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


return(
    <div>
          <h4>The information of course: {course.courseTitle} </h4>
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


export default CourseView;