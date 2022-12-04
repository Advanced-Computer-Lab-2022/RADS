import { useState } from "react"

const CorpTraineePassword = () => {


    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const corpTrainee = {password};

        const response = await fetch('/CorpTrainee/password/635aff3e92426ef4e8a9e179',{
            method:'PATCH',
            body: JSON.stringify(corpTrainee),
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



export default CorpTraineePassword;