import { useState } from "react"


const InstructorUpdatePassword = () => {


    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);
    const instId = "638c11d6147e2173163fd962";
    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const instructor = {password};

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


            setPassword('');
        
            setError(null);
            console.log("Info Changed", json);
            
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Password</h3>
           
  
            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default InstructorUpdatePassword;