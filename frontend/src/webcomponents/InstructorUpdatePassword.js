import { useState,useEffect} from "react";


const InstructorUpdatePassword = () => {


    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);
    const instId = "638c11d6147e2173163fd962";
    const [email,setEmail] = useState('');
    const [html1,setHtml1] = useState('');
    const [html2,setHtml2] = useState('');


    useEffect(() => {
        const fetchInstructor = async() => {
            const response = await fetch(`/instructor/${instId}`);
            const json = await response.json();
            if (response.ok) {
                setEmail(json.email);
            }
        }
        fetchInstructor();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const instructor = {password};
        const response = await fetch(`/Instructor/password/${instId}`,{
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
            setHtml1("Password Changed Successfully.");
        }
    }    

    const forgotPassword = async(e) =>{
       //prevent form submission 
       e.preventDefault()
        const instEmail = {email};
        console.log(email);
        const response = await fetch(`/instructor/forgot/${instId}`,{
            method:'POST',
            body: JSON.stringify(instEmail),
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
           
            <h3>Change Your Password</h3>
            {/* <label>Old Password:</label> */}
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
        <p><strong>{html1}</strong></p>
        </div>
    )
}



export default InstructorUpdatePassword;