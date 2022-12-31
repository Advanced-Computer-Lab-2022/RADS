import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Box, Button } from "@mui/material";

const CorpTraineeInsert = (props) => {
  const { rateVal, currencyVal } = props;
  const params = new URLSearchParams(window.location.search);
  const adminId = params.get("adminId");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    const corpTrainee = {
      firstName,
      lastName,
      userName,
      gender,
      password,
      country,
      phoneNumber,
      address,
      email,
    };
    axios
      .post("/admin/addctrainee", corpTrainee)
      .then((res) => {
        setFirstName("");
        setLastName("");
        setUserName("");
        setGender("");
        setPassword("");
        setCountry("");
        setPhoneNumber("");
        setAddress("");
        setEmail("");
        setError(null);
        console.log("New Instructor Added", res.data);
        //refresh page on successful submission
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box className="card-border">
      <form className="create-corptrainee column" onSubmit={handleSubmit}>
        <h3>Corporate Trainee: Insert Your Information</h3>

        <Box className="column-child">
          <label>First name:</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </Box>

        <Box className="column-child">
          <label>Last name:</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </Box>

        <Box className="column-child">
          <label>User name:</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </Box>

        <Box className="column-child">
          <label>Gender:</label>
          <input
            type="text"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          />
        </Box>

        <Box className="column-child">
          <label>Password:</label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Box>

        <Box className="column-child">
          <label>Country:</label>
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </Box>

        <Box className="column-child">
          <label>Phone Number:</label>
          <input
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </Box>

        <Box className="column-child">
          <label>Address:</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </Box>

        <Box className="column-child">
          <label>Email: </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Box>

        <Box className="column-child"><Button variant="contained" type="submit">Submit</Button></Box>
        {error && <Box className="error">{error}</Box>}
      </form>
    </Box>
  );
};

export default CorpTraineeInsert;
