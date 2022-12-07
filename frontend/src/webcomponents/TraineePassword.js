import { useState,useEffect } from "react"


const TraineePassword = () => {


    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);
    const traineeId = "63906b4cb9b09cd81e48472f";
    const [email,setEmail] = useState('');
    const [html1,setHtml1] = useState('');
    const [html2,setHtml2] = useState('');


    useEffect(() => {
        const fetchTrainee = async() => {
            const response = await fetch(`/trainee/${traineeId}`);
            const json = await response.json();
            if (response.ok) {
                console.log(json.email);
                setEmail(json.email);
            }
        }
        fetchTrainee();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const trainee = {password};

        const response = await fetch(`/trainee/password/${traineeId}`,{
            method:'PATCH',
            body: JSON.stringify(trainee),
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
            setHtml1("Password Changed Successfully.");
        }
    }    

    const forgotPassword = async(e) =>{
        //prevent form submission 
        e.preventDefault()
         const trainEmail = {email};
         const response = await fetch(`/trainee/forgot/${traineeId}`,{
             method:'POST',
             body: JSON.stringify(trainEmail),
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
             console.log("Info Changed", json);
             setHtml2("A link was sent on your email to verify");
         }
     } 
    return (
        <div>
        <div>
        <button type="text" onClick={forgotPassword}>Forget Password</button> 
        <p><strong>{html2}</strong></p>
        </div>
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Information</h3>
            <h3>Change Your Password</h3>
            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
        <p><strong>{html1}</strong></p>
        </div>
    )
}



export default TraineePassword;