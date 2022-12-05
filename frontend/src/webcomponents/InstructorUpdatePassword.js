import { useState,useEffect} from "react";


const InstructorUpdatePassword = () => {


    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);
    const instId = "638c11d6147e2173163fd962";
    const [instEmail,setInstEmail] = useState('');
    const [html,setHtml] = useState('');


    useEffect(() => {
        const fetchInstructor = async() => {
            const response = await fetch(`/instructor/${instId}`);
            const json = await response.json();
            if (response.ok) {
                setInstEmail(json.email);
            }
        }
        fetchInstructor();
    }, [])

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

    const forgotPassword = async(e) =>{
       //prevent form submission 
       e.preventDefault()
        const email = {instEmail};
        console.log(email);
        const response = await fetch(`/instructor/forgot/${instId}`,{
            method:'POST',
            body: JSON.stringify(email),
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
            setHtml("A link was sent on your email to verify");
            //refresh page on successful submission
        }
    } 

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <div>
            <button type="text" onClick={forgotPassword}>Forget Password</button> 
            <p><strong>{html}</strong></p>
            </div>
            <h3>Change Your Password</h3>
            <label>Old Password:</label>
            {/* <input type="text" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            /> */}
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