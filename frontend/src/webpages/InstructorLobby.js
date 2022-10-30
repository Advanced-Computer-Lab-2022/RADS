// Components
import CourseCreate from "../webcomponents/CourseCreate"
import SearchCourse from "../webcomponents/SearchCourse"
// To fetch all instructor from the backend
const InstructorLobby = () => {
    return (
        <div className="lobby">
             <SearchCourse />
        <div className="course-add">
           <CourseCreate />
        </div>
        </div>
        
    )
}


export default InstructorLobby;