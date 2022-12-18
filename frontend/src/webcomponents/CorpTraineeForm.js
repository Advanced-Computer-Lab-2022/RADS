import { useState, useEffect } from "react"
import Link from '@mui/material/Link';


const CorpTraineeForm = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const corpTraineeId = params.get('corpTraineeId');
    const [courses,setCourses] = useState([]);
    const [coursesIds,setCoursesIds] = useState([]);
    

    useEffect(()=>{
        const viewRegistered = async () => {
            const response = await fetch(`/corptrainee/${corpTraineeId}`);
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
     {courses.length === 0 ?( <p><strong><bold>{`You dont have access to any Course.`}</bold></strong></p>) : (       
        <div>
        {courses && courses.map((course)=>(
          <div key = {course._id}>
             <Link onClick={() => window.location.href = `/corptraineecourse?courseId=${course._id}&corpTraineeId=${corpTraineeId}`} key={course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5</Link>
         </div>
             ))}
             </div>
             )}   
       </div>   
)
}



export default CorpTraineeForm;