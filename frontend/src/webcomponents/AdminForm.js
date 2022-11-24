import { useState } from "react"
import {  } from "react-router-dom";

const AdminForm = () => {

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const admin = {userName,password};

        const response = await fetch('/Admin/editAdmin/635d20b5fd2a0783a27501b8',{
            method:'POST',
            body: JSON.stringify(admin),
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
            setUserName('');
            setPassword('');
            setError(null);
            console.log("Admin Info Changed", json);
            
            //refresh page on successful submission
            window.location.reload();
        }
    }    

    return (
        <form className="create-admin" onSubmit={handleSubmit}>
            <h3>Admin: Insert Your New Information</h3>
           
            <label>Username:</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)}
            value= {userName}
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



export default AdminForm;