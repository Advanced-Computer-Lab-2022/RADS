// import axios from 'axios';
import { useState,useEffect } from 'react';
import Link from '@mui/material/Link';

const TraineeForm =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const traineeId = params.get('traineeId');
    const [courses,setCourses] = useState([]);
    const [coursesIds,setCoursesIds] = useState([]);
    const [trainee,setTrainee] = useState([]);


    useEffect(()=>{
        const viewRegistered = async () => {
            const response = await fetch(`/trainee/${traineeId}`);
            const json = await response.json();
            console.log(json.courses);
            if(response.ok){
                fetchCourses(json.courses);
                console.log(json.courses);
                setCoursesIds(json.courses)
                setTrainee(json);
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
             <Link onClick={() => window.location.href = `/traineecourse?courseId=${course._id}&traineeId=${traineeId}`} key={course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5</Link>
             <button onClick={() => window.location.href = `/traineereport?courseId=${course._id}&traineeId=${traineeId}`}>Report Course</button>
                </div>
             ))}
             </div>
             )}
               <button onClick={() => window.location.href = `/traineeviewreports?traineeId=${traineeId}`}>View Reports</button>   
       </div>   
)
}


export default TraineeForm;