import { useState } from "react"
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Box } from "@mui/material";
const CorpTraineePassword = (props) => {
    const {
        rateVal,
        currencyVal,
        token
      } = props;
      const decode = jwt_decode(token);
      const corpTraineeId = decode.id;
    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);


    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const trainee = {password};
        axios
        .patch(`/corptrainee/password/${corpTraineeId}`, trainee)
        .then((res) => {
            setPassword('');
            setError(null);
            console.log("Info Changed", res.data);
            //refresh page on successful submission
            window.location.reload();
        })
        .catch((error) => {
            console.error(error)
        })
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Information</h3>
           

            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            />

            <button>Submit</button>
            {error && <Box className="error">{error}</Box>}
        </form>
    )
}



export default CorpTraineePassword;