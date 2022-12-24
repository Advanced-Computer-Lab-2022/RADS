import { useState,useEffect} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const InstructorUpdatePassword = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const decode = jwt_decode(token);
    const instructorId = decode.id;
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [html1,setHtml1] = useState('');
    const [html2,setHtml2] = useState('');
    


    useEffect(() => {
        const fetchInstructor = async() => {
            axios
            .get(`/instructor/${instructorId}`)
            .then((res) => {
                setEmail(res.data.email);
            })
            .catch((error) => {
                console.error(error)
            })
        }
        fetchInstructor();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const instructor = {password};
        axios
        .patch(`/instructor/password/${instructorId}`, instructor)
        .then((res) => {
            setPassword('');
            console.log("Info Changed", res.data);
            setHtml1("Password Changed Successfully.");
        })
        .catch((error) => {
            console.error(error)
        })
    }    

    // const forgotPassword = async(e) =>{
    //    //prevent form submission 
    //    e.preventDefault()
    //     const instEmail = {email};
    //     console.log(email);
    //     const response = await fetch(`/instructor/forgot/${instructorId}`,{
    //         method:'POST',
    //         body: JSON.stringify(instEmail),
    //         headers:{
    //             "Access-Control-Allow-Origin": "*",
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const json = await response.json();
    //     if(!response.ok){
    //         setError(json.error);
    //     }
    //     if(response.ok){
    //         setError(null);
    //         console.log("Info Changed", json);
    //         setHtml2("A link was sent on your email to verify");
    //     }
    // } 

    return (
       <div> 
        <div>
        {/* <button type="text" onClick={forgotPassword}>Forget Password</button>  */}
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
            
        </form>
        <p><strong>{html1}</strong></p>
        </div>
    )
}



export default InstructorUpdatePassword;