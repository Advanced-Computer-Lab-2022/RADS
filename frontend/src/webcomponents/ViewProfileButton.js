import { useState } from "react"
import { Link } from "react-router-dom";
import InstructorProfile from '../webpages/InstructorProfile'

const ViewProfileButton = () => {
    
    const [error,setError] = useState(null);
    const [modal,setModal] = useState(false);
    const [instructors,setInstructor] = useState('');
        
    useEffect(()=>{
        const fetchInstInfo = async () => {
            const response = await fetch('/Instructor/635ae0cddbd2637f3105dfb7');
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
        <div className="view-profile">
        <div>
            {instructors && instructors.map((instructor)=>(
                     <div>      
                     <button  className={instructor._id} onClick={()=>{setModal(true)}}>View Profile</button>
                     {modal && <InstructorProfile key = {instructor._id} instructor = {instructor}  />}
                     </div>
                ))}

        </div>
        </div>
    )
}



export default ViewProfileButton;

