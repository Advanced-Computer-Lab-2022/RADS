import { useState, useEffect } from "react"
import InstructorProfileDetails from './InstructorProfileDetails'
import InstructorDetails from './InstructorDetails'
import { Box } from "@mui/material";

const ViewProfileButton = () => {

    const [error,setError] = useState(null);
    const [modal,setModal] = useState(false);
    const [instructors,setInstructor] = useState('');

    useEffect(()=>{
        const fetchInstInfo = async () => {
            const response = await fetch('/Instructor');
            const json = await response.json();
            if(!response.ok){
                setError(json.error);
            }
            if(response.ok){
                setError(null);
                setModal(false);
                console.log(json);
                setInstructor(json)
            }
        }
        fetchInstInfo();
    }, [])

    return (
        <Box className="view-profile">
        <Box>
            {instructors && instructors.map((instructor)=>(
                     <Box>
                     <InstructorDetails key={instructor._id} instructor={instructor} />
                     <button  className={instructor._id} onClick={()=>{setModal(true)}}>View Profile</button>
                     {modal && <InstructorProfileDetails key = {instructor._id} instructor = {instructor}  />}
                     </Box>
                ))}
        </Box>
        </Box>
    )
}



export default ViewProfileButton;


