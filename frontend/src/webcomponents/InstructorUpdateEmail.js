import { useState } from "react"


const InstructorUpdateEmail = () => {

    const [email,setEmail] = useState('');

    const [error,setError] = useState(null);
    const instId = "638c11d6147e2173163fd962";
    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const instructor = {email};

        const response = await fetch(`/Instructor/changeInfo/${instId}`,{
            method:'PATCH',
            body: JSON.stringify(instructor),
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


            setEmail('');
        
            setError(null);
            console.log("Info Changed", json);
            
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Email</h3>
           
            <label>Email:</label>
            <input type="text" onChange={(e) =>  setEmail(e.target.value)}
            value= {email}
            />

 
            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default InstructorUpdateEmail;