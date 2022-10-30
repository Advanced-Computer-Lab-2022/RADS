import { useEffect, useState } from "react"
import CourseDetails from '../webcomponents/CourseDetails';

const Home = () => {
    const [courses, setCourses] = useState(null);
    const [openModal, setOpenModal] = useState(false);
useEffect(() => {
    const fetchCourses = async () => {
        const response = await fetch('/course');
        const json = await response.json();

        if(response.ok){
            setCourses(json)
            setOpenModal(false);
            
        }
    }
    fetchCourses();
}, [])


    // const renderDetails = (key,course) =>{
    //     console.log(course)
    //     return (  
  
    //         <CourseDetails key={key} course = {course} />
          
    //     )

    // }
    return (
        <div className="home-lobby">
            Welcome to RADS Online Course Provider
            <div className="instructors">
                {courses && courses.map((course)=>(
                     <div>
                     <p key = {course._id}>Course: {course.courseTitle}, Total Hours: {course.totalHours}
                     ,Rating = {course.rating} Out of 5</p>
                     <button  className={course._id} onClick={()=>{setOpenModal(true);}}>View Course</button>
                    {openModal && <CourseDetails key={course._id} course = {course} />}
                     </div>
                ))}
                
            </div>
        </div>
    )
}


export default Home