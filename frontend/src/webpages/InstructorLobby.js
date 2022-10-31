import { useEffect, useState } from "react"
// Components
import CourseCreate from "../webcomponents/CourseCreate"
import SearchCourse from "../webcomponents/SearchCourse"
import InstructorDetails from '../webcomponents/InstructorDetails'
import ViewProfileButton from "../webcomponents/ViewProfileButton";
const InstructorLobby = () => {
    const [instructors, setInstructors] = useState(null);
    useEffect(() => {
        const fetchInstructors = async () => {
            const response = await fetch('/Instructor');
            const json = await response.json();
    
            if(response.ok){
                setInstructors(json)
                
            }
        }
        fetchInstructors();
    }, [])

    return (
        <div className="lobby">
             <SearchCourse />
        <div className="course-add">
           <CourseCreate />
        </div>
        <div className="instructor-list"></div>
                        <ViewProfileButton />
            <p> </p>
        </div>
        
    )
}


export default InstructorLobby;