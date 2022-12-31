import { Box, Button } from "@mui/material";
import { useState } from "react"
import { useParams } from "react-router-dom";


const TraineeForgotPass = (props) => {
    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);
    const [html,setHtml] = useState('');
    const {
        rateVal,
        currencyVal
    } = props;
    // const params = new URLSearchParams(window.location.search);
    // const instructorId = params.get('instructorId');
    const traineeId = useParams();
    console.log(traineeId.id);
    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const trainee = {password};
        const response = await fetch(`/trainee/password/${traineeId.id}`,{
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
            setHtml("Password Changed successfully");
            console.log("Info Changed", json);
            //refresh page on successful submission
        }
    }    

    return (
        <form className="change-info" onSubmit={handleSubmit}>
            <h3>Change Your Password</h3>
            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            />
            <Button
          variant="contained">Submit</Button>
            <p>{html}</p>
            {error && <Box className="error">{error}</Box>}
        </form>
    )
}



export default TraineeForgotPass;