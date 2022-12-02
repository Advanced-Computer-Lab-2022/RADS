import { useState } from "react"
import {  } from "react-router-dom";

const TraineePassword = () => {


    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const Trainee = {password};

        const response = await fetch('/Trainee/password/:id',{
            method:'PATCH',
            body: JSON.stringify(Trainee),
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
            <h3>Change Your Information</h3>
           

            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default TraineePassword;