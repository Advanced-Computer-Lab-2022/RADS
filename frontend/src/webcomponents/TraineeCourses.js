import { useState,useEffect } from "react";
import { Link } from "react-router-dom";



const TraineeCourses = (props) =>{
    const{
        rateVal,
        currencyVal
    } = props;
    const [course,setCourse] = useState('')
    //update the model of trainees to have array of course IDS to be their registered courses
    const courseId = "638c139b147e2173163fd976";
    useEffect(()=>{
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if(response.ok){
              console.log(json);
              setCourse(json);
            }
        }
        fetchCourse();
    }, [])

return(
    <div>
    {/* {courses && courses.map((course)=>(
        <div>
        <Link onClick={() => window.location.href=`/filtercorp?courseId=${course._id}`} key={course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5</Link>
        </div>
    ))} */}
    <Link onClick={() => window.location.href=`/filtercorp?courseId=${course._id}`} key={course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5</Link>
    </div>
)

}

export default TraineeCourses;