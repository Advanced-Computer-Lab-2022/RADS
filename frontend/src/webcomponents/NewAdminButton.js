import { useState } from "react"
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Box, Button } from "@mui/material";

const NewAdminButton = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const decode = jwt_decode(token);
    const adminId = decode.id;
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const admin = {firstName,lastName};
        axios
        .post('/admin/addAdmin', admin)
        .then((res) => {
            setFirstName('');
            setLastName(''); 
            setError(null);
            console.log("New Admin Posted", res.data);
            //refresh page on successful submission
            window.location.reload();
        })
        .catch((error) => {
            console.error(error)
        })
    }    

    return (
      <div className="card-border">
        <h2> Add new admin: </h2>
        <form className="create-admin" onSubmit={handleSubmit}>
          <label>First name:</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />

          <label>Last name:</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <Button variant="contained" type="submit">Create Admin</Button>
          {error && <Box className="error">{error}</Box>}
        </form>
      </div>
    );
}



export default NewAdminButton;