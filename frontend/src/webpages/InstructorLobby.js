import { useEffect,useState } from "react"

// Components
import CourseCreate from "../webcomponents/CourseCreate"


// To fetch all instructor from the backend
const InstructorLobby = () => {
    return (
        <div className="course-add">
           <CourseCreate />
        </div>
    )
}


export default InstructorLobby;