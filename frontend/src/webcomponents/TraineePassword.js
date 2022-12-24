import { useState,useEffect } from "react"
import axios from "axios";
import jwt_decode from "jwt-decode";
const TraineePassword = (props) => {
    const {
        rateVal,
        currencyVal,
        token
      } = props;
    const decode = jwt_decode(token);
    const traineeId = decode.id;
    const [password, setPassword] = useState('');  
    const [email,setEmail] = useState('');
    const [html1,setHtml1] = useState('');
    const [html2,setHtml2] = useState('');


    useEffect(() => {
        const fetchTrainee = async () => {
            axios
                .get(`/trainee/${traineeId}`)
                .then((res) => {
                    setEmail(res.data.email);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchTrainee();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const trainee = {password};
        axios
        .post(`/trainee/password/${traineeId}`, trainee)
        .then((res) => {
            setPassword('');
            console.log("Info Changed", res.data);
            setHtml1("Password Changed Successfully.");
        })
        .catch((error) => {
            console.error(error)
        })
    }    

    const forgotPassword = async(e) =>{
        //prevent form submission 
        e.preventDefault()
         const trainEmail = {email};
         axios
        .post(`/trainee/forgot/${traineeId}`, trainEmail)
        .then((res) => {
            console.log("Info Changed", res.data);
            setHtml2("A link was sent on your email to verify");
        })
        .catch((error) => {
            console.error(error)
        })
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
           
        </form>
        <p><strong>{html1}</strong></p>
        </div>
    )
}



export default TraineePassword;