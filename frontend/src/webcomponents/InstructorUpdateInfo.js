import { useState } from "react"
import {  } from "react-router-dom";

const InstructorUpdateInfo = () => {

    const [email,setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const instructor = {email,bio,password};

        const response = await fetch('/Instructor/changeInfo/:id',{
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
            setBio('');
            setPassword('');
            setError(null);
            console.log("Info Changed", json);
            
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Information</h3>
           
            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)}
            value= {email}
            />

            <label>Bio:</label>
            <input type="text" onChange={(e) => setBio(e.target.value)}
            value= {bio}
            />
            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default InstructorUpdateInfo;