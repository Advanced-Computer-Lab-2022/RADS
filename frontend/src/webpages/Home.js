import { useEffect, useState } from "react"
const Home = () => {
    const [courses, setCourses] = useState(null);
useEffect(() => {
    const fetchCourses = async () => {
        const response = await fetch('/course');
        const json = await response.json();

        if(response.ok){
            setCourses(json)
            
        }
    }
    fetchCourses();
}, [])

    return (
        <div className="home-lobby">
            Welcome to RADS Online Course Provider
            <div className="instructors">
                {courses && courses.map((course)=>(
                     <p key = {course._id}>Course: {course.courseTitle}, Total Hours: {course.totalHours}
                     ,Rating = {course.rating} Out of 5</p>
                ))}
            </div>
        </div>
    )
}


export default Home