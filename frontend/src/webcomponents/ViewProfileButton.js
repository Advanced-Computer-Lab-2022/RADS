import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import InstructorProfile from '../webpages/InstructorProfile'
import InstructorProfileDetails from '../webcomponents/InstructorProfileDetails'
import InstructorDetails from '../webcomponents/InstructorDetails'

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
        <div className="view-profile">
        <div>
            {instructors && instructors.map((instructor)=>(
                     <div>
                     <InstructorDetails key={instructor._id} instructor={instructor} />
                     <button  className={instructor._id} onClick={()=>{setModal(true)}}>View Profile</button>
                     {modal && <InstructorProfileDetails key = {instructor._id} instructor = {instructor}  />}
                     </div>
                ))}

        </div>
        </div>
    )
}



export default ViewProfileButton;


