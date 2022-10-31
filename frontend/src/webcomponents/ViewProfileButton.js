import { useState } from "react"
import { Link } from "react-router-dom";

const ViewProfileButton = () => {
    
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        

        const response = await fetch('/Instructor/635ae0cddbd2637f3105dfb7',{
            method:'GET',
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){    
            setError(null);
            console.log(json);
            
            
        }
    }    

    return (
        <form className="view-profile" onSubmit={handleSubmit}>
            
            <button>View Profile</button>
            {error && <div className="error">{error}</div>}
            <Link to="/instructorlobby/viewcourses/{instructors.id}" />
        </form>
    )
}



export default ViewProfileButton;

