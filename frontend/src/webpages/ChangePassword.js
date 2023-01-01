import { Box, Button } from "@mui/material";
import { useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

const ChangePassword = (props) => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error,setError] = useState("");
    const [html,setHtml] = useState('');
    const [visible,setVisible] = useState(false);
    const {
        rateVal,
        currencyVal
    } = props;
    const id = useParams().id;
    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        if(password !== confirm){
            setHtml("Password do not match")
        }
        else{
        const info = {id,password};
        axios
          .post("/guest/changepassword", info)
          .then((res) => {
            setPassword("");
            setConfirm("");
            setError("");
            setHtml("Password changed successfully");
            setVisible(true);
          })
          .catch((error) => {
            console.log(error);
            // if(!error.response.data.email){
            //   setError(error.response.data.email)
            // }else{
            //   setError("Missing Fields")
            // }
          });
        }
    }    

    return (
        <div>
        <form className="change-info" onSubmit={handleSubmit}>
        <fieldset>
        <h3>Enter your new password</h3>
        <input type="password" required onChange={(e) => setPassword(e.target.value)}
        value= {password}
        />
        </fieldset>
        <fieldset>
        <h3>Re-enter new password</h3>
         <input type="password" required onChange={(e) => setConfirm(e.target.value)}
        value= {confirm}
        />
          </fieldset>
        <Button type="submit" variant="contained">Submit</Button>
        <p><strong>{html}</strong></p>
        {error !== "" && <p><strong>{error}</strong></p>}
    </form>
    {visible && <Button onClick={() =>(window.location.href = `/login`)}>Go back to Login</Button>}
    </div>
    )
}



export default ChangePassword;