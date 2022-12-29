import { useState } from "react"
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Box } from "@mui/material";

const InstructorForm = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const decode = jwt_decode(token);
    const adminId = decode.id;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault() //prevent form submission
        const instructor = { firstName, lastName, userName, password, country, phoneNumber, address, email, gender, bio };
        axios
            .post('/admin/addinstructor', instructor)
            .then((res) => {
                setFirstName('');
                setLastName('');
                setUserName('');
                setPassword('');
                setCountry('');
                setPhoneNumber('');
                setAddress('');
                setEmail('');
                setGender('');
                setBio('');
                setError(null);
                console.log("New Instructor Added", res.data);
                //refresh page on successful submission
                window.location.reload();
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <form className="create-instructor" onSubmit={handleSubmit}>
            <h3>Instructor: Insert Your Information</h3>

            <label>First name:</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />

            <label>Last name:</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />

            <label>User name:</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)}
                value={userName}
            />

            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}
                value={password}
            />


            <label>Country:</label>
            <input type="text" onChange={(e) => setCountry(e.target.value)}
                value={country}
            />

            <label>Phone Number:</label>
            <input type="number" onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
            />

            <label>Address:</label>
            <input type="text" onChange={(e) => setAddress(e.target.value)}
                value={address}
            />

            <label>Email: </label>
            <input type="text" onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Gender:</label>
            <input type="text" onChange={(e) => setGender(e.target.value)}
                value={gender}
            />

            <label>Bio: </label>
            <input type="text" onChange={(e) => setBio(e.target.value)}
                value={bio}
            />

            <button>Submit</button>
            {error && <Box className="error">{error}</Box>}
        </form>
    )
}



export default InstructorForm;