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

  
}


export default Home