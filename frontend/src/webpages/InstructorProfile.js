import { useEffect,useState } from "react"

// Components
import InstructorProfile from "../webcomponents/InstructorProfile";

// To fetch an instructor and view the courses and details from the backend
const InstructorProfile = () => {
    return (
        <><div className="instructor-profile">
            <InstructorProfile />
        </div><div className="course-add">
                <CourseCreate />
            </div> //</>
        
    )
}


export default InstructorProfile;