import { useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// Components
import CourseCreate from "../webcomponents/CourseCreate"
import InstructorDetails from '../webcomponents/InstructorDetails'
import InstructorProfile from '../webcomponents/InstructorProfile'
import ViewProfileButton from "../webcomponents/ViewProfileButton"

// To fetch all instructor from the backend
const InstructorLobby = () => {
    const navigate = useNavigate();

//get all courses taught by instructor
   

    const navigateInstructor = () => {
      navigate('/instructor');
    };
    const [instructors, setInstructors] = useState(null);
    useEffect(()=>{
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
        <><div className="home">
            <div className="instructors">
            <h2>Instructors:</h2>
           {instructors && instructors.map((instructor)=>(
                // <p key = {instructor._id}>{instructor.userName}</p>
                <>
                   <InstructorDetails key={instructor._id} instructor={instructor} /><ViewProfileButton /></>
            ))}  
            </div>
        </div>
        
        <div className="course-add">
                <CourseCreate />
            </div></>
    )
}


export default InstructorLobby;