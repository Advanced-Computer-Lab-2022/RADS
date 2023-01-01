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
  const [html,setHtml] = useState("");
  const [error, setError] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    let role = "CORP_TRAINEE";
    let confirm = password;
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
      confirm,
      role,
    };
    axios
      .post("/create/corptrainee", corpTrainee)
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
        setError("");
        setHtml("New corptrainee Added");
      })
      .catch((error) => {
        if(!error.response.data.userName && error.response.data.email){
          setError(error.response.data.email)
        }
        else if(error.response.data.userName && !error.response.data.email){
          setError(error.response.data.userName)
        }else{
          setError("Missing Fields")
        }
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
            required
      />
        </Box>

        <Box className="column-child">
          <label>Last name:</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
      />
        </Box>

        <Box className="column-child">
          <label>User name:</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />
        </Box>

        <Box className="column-child">
          <label>Password:</label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </Box>

        <Box className="column-child">
          <label>Country:</label>
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            required
      />
        </Box>

        <Box className="column-child">
          <label>Phone Number:</label>
          <input
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            required
      />
        </Box>

        <Box className="column-child">
          <label>Address:</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
      />
        </Box>

        <Box className="column-child">
          <label>Email: </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
      />
        </Box>

      <fieldset>
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            value="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>

        <label>
          <input
            type="radio"
            value="other"
            checked={gender === "other"}
            onChange={(e) => setGender(e.target.value)}
          />
          Other
        </label>
      </fieldset>

        <Box className="column-child"><Button type='submit' variant="contained">Submit</Button></Box>
        {error !== "" && <p><strong>{error}</strong></p>}
      <p><strong>{html}</strong></p>
      </form>
    </Box>
  );
};

export default CorpTraineeInsert;
