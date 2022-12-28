import axios from "axios";
import { useState } from "react"
import jwt_decode from "jwt-decode";

const AdminForm = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const decode = jwt_decode(token);
    const adminId = decode.id;
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const admin = {userName,password};
        axios
        .patch(`/admin/editAdmin/${adminId}`, admin)
        .then((res) => {
            setUserName('');
            setPassword('');
            setError(null);
            console.log("Admin Info Changed", res.data);
            window.location.reload();
        })
        .catch((error) => {
            console.error(error)
        })
    }    

    return (
        <form className="create-admin" onSubmit={handleSubmit}>
            <h3>Admin: Insert Your New Information</h3>
           
            <label>Username:</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)}
            value= {userName}
            />

            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
            value= {password}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default AdminForm;