// import axios from 'axios';
import { useState,useEffect } from 'react';

const TraineeForm =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const traineeId = params.get('traineeId');
    const [courses,setCourses] = useState([]);
    const [coursesIds,setCoursesIds] = useState([]);

    useEffect(()=>{
        const viewRegistered = async () => {
            const response = await fetch(`/trainee/${traineeId}`);
            const json = await response.json();
            console.log(json.courses);
            if(response.ok){
                fetchCourses(json.courses);
                console.log(json.courses);
                setCoursesIds(json.courses)
            }
        }
        viewRegistered();
    }, [])


    const fetchCourses = async (ids) => {
        let courseIds = {ids};
        const response = await fetch(`/course/subset`,{
            method:'POST',
            body: JSON.stringify(courseIds),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(response.ok){
            setCourses(json);
        }
    }
    
return(
   <div>
     {courses.length === 0 ?( <p><strong><bold>{`You have not registered in any Course.`}</bold></strong></p>) : (       
        <div>
        {courses && courses.map((course)=>(
          <div key = {course._id}>
          <h4>The information of course: {course.courseTitle} </h4>
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
            <button onClick={() => window.location.href=`/traineerate?traineeId=${traineeId}&courseId=${course._id}`}>Rate Course</button>
            <button onClick={() => window.location.href=`/traineesolve?traineeId=${traineeId}&courseId=${course._id}`}>Solve Exercises</button>
            <p><strong>============================================================================================================</strong></p>
                </div>
             ))}
             </div>
             )}   
       </div>   
)
}


export default TraineeForm;