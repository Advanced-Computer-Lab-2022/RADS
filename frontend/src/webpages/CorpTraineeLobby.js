import { useEffect, useState } from "react"
//import CourseDetails from '../webcomponents/CourseDetails';
import SelectCountry from '../webcomponents/SelectCountry';
import CorpTraineeSearch from "../webcomponents/CorpTraineeSearch";
import CorpTraineePassword from "../webcomponents/CorpTraineePassword";


const CorpTraineeLobby = () => {
    const [courses, setCourses] = useState(null);
    const [corpTrainee, setPassword] = useState(null);
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
useEffect(() => {
    const fetchCourses = async () => {
        const response = await fetch('/CorpTrainee/password/:id');
        const json = await response.json();

        if(response.ok){
            setPassword(json)
            
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
            Welcome to RADS Online Course Provider (CorpTraineeLobby side)
            <div className="selectCountry">
                <p> </p>
                <SelectCountry />
                <CorpTraineePassword />
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
            <p> </p>
            <CorpTraineeSearch />
        </div>
    )
}


export default CorpTraineeLobby;