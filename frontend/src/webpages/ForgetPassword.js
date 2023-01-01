import { Box, Button } from "@mui/material";
import { useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

const ForgetPassword = (props) => {
    const [email, setEmail] = useState('');
    const [error,setError] = useState("");
    const [html,setHtml] = useState('');
    const {
        rateVal,
        currencyVal
    } = props;
    
  
    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const info = {email};
        axios
          .post("/guest/forgotpassword", info)
          .then((res) => {
            setEmail("");
            setError("");
            setHtml("Email sent successfully");
          })
          .catch((error) => {
            if(error.response.data.email){
              setError(error.response.data.email)
            }else{
              setError("Wrong Email")
            }
          });
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <fieldset>
            <h3>Enter Your Email</h3>
            <input type="text" required onChange={(e) => setEmail(e.target.value)}
            value= {email}
            />
            </fieldset>
            <Button type="submit" variant="contained">Submit</Button>
            <p><strong>{html}</strong></p>
            {error !== "" && <p><strong>{error}</strong></p>}
        </form>
    )
}



export default ForgetPassword;