import { useEffect, useState } from "react"

// components
import InstructorDetails from '../webcomponents/InstructorDetails'
import CorpTraineeDetails from '../webcomponents/CorpTraineeDetails'

import InstructorForm from "../webcomponents/InstructorForm"
import CorpTraineeForm from "../webcomponents/CorpTraineeForm"

const Admin = () => {
    const [instructors, setInstructors] = useState(null);
    const [corpTrainees, setCorpTrainees] = useState(null);
useEffect(() => {
    const fetchCorpTrainees = async () => {
        const response = await fetch('/corpTrainee');
        const json = await response.json();

        if(response.ok){
            setCorpTrainees(json)
            
        }
    }
    fetchCorpTrainees();
}, [])

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
    <div className="home">
        <div className="instructors">
            <h2>corpTrainees:</h2>
        {corpTrainees && corpTrainees.map((corpTrainee)=>(
                
                <CorpTraineeDetails key = {corpTrainee._id} corpTrainee={corpTrainee}/>
            ))}
            <h2> ================================================================</h2>
        <h2>Instructors:</h2>
           {instructors && instructors.map((instructor)=>(
                // <p key = {instructor._id}>{instructor.userName}</p>
                <InstructorDetails key = {instructor._id} instructor={instructor}/>
            ))}  
        </div>
        <InstructorForm />
        <CorpTraineeForm />
    </div>
)
}


export default Admin