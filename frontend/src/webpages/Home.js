import { useEffect,useState } from "react"
import { Link } from "react-router-dom"

// Components
import InstructorDetails from '../webcomponents/InstructorDetails'
import InstructorForm from "../webcomponents/InstructorForm";
import InstructorProfile from "../webcomponents/InstructorProfile";

// To fetch all instructor from the backend
const Home = () => {
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
        <div className="home">
            <h2>Instructors List</h2>
            <div className="instructors">
                {instructors && instructors.map((instructor)=>(
                    // <p key = {instructor._id}>{instructor.userName}</p>
                    <>
                        <p key = {instructor._id}>{instructor.userName}</p>
                        <InstructorDetails key={instructor._id} instructor={instructor}/>
                        <Link to="/instructor/{instructors._id}">      
                            {instructors.userName}
                        </Link></>
                    ))}
            </div>
            <InstructorForm />
        </div>
    )
}


export default Home