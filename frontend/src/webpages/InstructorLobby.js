import { useEffect, useState } from "react"
// Components
import CourseCreate from "../webcomponents/CourseCreate"
import SearchCourse from "../webcomponents/SearchCourse"
import InstructorDetails from '../webcomponents/InstructorDetails'
import InstructorUpdateInfo from "../webcomponents/InstructorUpdateInfo"
import ViewProfileButton from "../webcomponents/ViewProfileButton";
const InstructorLobby = () => {
    const [instructors, setInstructors] = useState(null);
    const [instructorsinfo, changeInfo] = useState(null);
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
    useEffect(() => {
        const fetchInstructors = async () => {
            const response = await fetch('/Instructor/changeInfo/:id');
            const json = await response.json();
    
            if(response.ok){
                changeInfo(json)
                
                
            }
        }
        fetchInstructors();
    }, [])

    return (
        <div className="lobby">
        <InstructorUpdateInfo />
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