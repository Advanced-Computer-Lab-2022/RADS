import { useEffect,useState } from "react"

// Components
import InstructorDetails from '../webcomponents/InstructorDetails'
import InstructorForm from "../webcomponents/InstructorForm";

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
            <div className="instructors">
                {instructors && instructors.map((instructor)=>(
                    // <p key = {instructor._id}>{instructor.userName}</p>
                    <InstructorDetails key = {instructor._id} instructor={instructor}/>
                ))}
            </div>
            <InstructorForm />
        </div>
    )
}


export default Home