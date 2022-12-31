import { useState } from "react"
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Box, Button } from "@mui/material";

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
      <Box className="card-border">
        <form className="create-instructor column" onSubmit={handleSubmit} validate>
          <h3>Instructor: Insert Your Information</h3>
          <Box className="column-child">
            <label>First name:</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              required
              value={firstName}
            />
          </Box>
          <Box className="column-child">
            <label>Last name:</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              required
              value={lastName}
            />
          </Box>
          <Box className="column-child">
            <label>User name:</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              required
              value={userName}
            />
          </Box>
          <Box className="column-child">
            <label>Password:</label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
          </Box>
          <Box className="column-child">
            <label>Country:</label>
            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              required
              value={country}
            />
          </Box>
          <Box className="column-child">
            <label>Phone Number:</label>
            <input
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              value={phoneNumber}
            />
          </Box>
          <Box className="column-child">
            <label>Address:</label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              required
              value={address}
            />
          </Box>
          <Box className="column-child">
            <label>Email: </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
          </Box>
          <Box className="column-child">
            <label>Gender:</label>
            <input
              type="radio"
              onChange={(e) => setGender(e.target.value)}
              name="male"
              required
              value={gender}
            />
          </Box>
          <Box className="column-child">
            <label name="male">male</label>
            <input
              type="radio"
              onChange={(e) => setGender(e.target.value)}
              name="female"
              required
              value={gender}
            />
          </Box>
          <Box className="column-child">
            <label name="female">female</label>
            <label>Bio: </label>
            <input
              type="text"
              onChange={(e) => setBio(e.target.value)}
              required
              value={bio}
            />
          </Box>
          <Box className="column-child"><Button variant="contained" type="submit">Submit</Button></Box>
          {error && <Box className="error">{error}</Box>}
        </form>
      </Box>
    );
}



export default InstructorForm;