import { useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// Components
import CourseCreate from "../webcomponents/CourseCreate"
import InstructorDetails from '../webcomponents/InstructorDetails'
import InstructorProfile from '../webcomponents/InstructorProfile'

// To fetch all instructor from the backend
const InstructorLobby = () => {
    const navigate = useNavigate();

    const navigateInstructor = () => {
      navigate('/instructor/635ae0cddbd2637f3105dfb7');
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
                {instructors && instructors.map((instructor) => (
                    // <p key = {instructor._id}>{instructor.userName}</p>
                    <>
                         <p key={instructor._id}>{instructor.userName}</p>
                        <InstructorDetails key={instructor._id} instructor={instructor} />
                        <Link to='/instructor/635ae0cddbd2637f3105dfb7'>{instructors.userName}
                            <button onClick={navigateInstructor}>View Details</button>         
                        </Link></>         
                ))}
            </div>
        </div>
        
        <div className="course-add">
                <CourseCreate />
            </div>//</>
    )
}


export default InstructorLobby;