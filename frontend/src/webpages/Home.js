import { useEffect, useState } from "react"
import CourseDetails from '../webcomponents/CourseDetails';
import SelectCountry from '../webcomponents/SelectCountry';
import HomeSearch from "../webcomponents/HomeSearch";


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
            <div className="selectCountry">
                <SelectCountry />
            </div>
            {/* <div className="instructors">
                {courses && courses.map((course)=>(
                     <div>
                     <p key = {course._id}>Course: {course.courseTitle}, Total Hours: {course.totalHours}
                     ,Rating = {course.courseRating} Out of 5, Price = {course.price}</p>
                     <button  className={course._id} onClick={()=>{setOpenModal(true)}}>View Course</button>
                    {openModal && <CourseDetails key={course._id} course = {course} />}
                     </div>
                ))}
            </div> */}
            {<HomeSearch />}
        </div>
    )
}


export default Home