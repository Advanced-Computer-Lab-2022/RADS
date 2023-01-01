import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Box, Button } from "@mui/material";

const InstructorForm = (props) => {
  const { rateVal, currencyVal, token } = props;
  const decode = jwt_decode(token);
  const adminId = decode.id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [html, setHtml] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    let role = "INSTRUCTOR";
    let confirm = password;
    let bio = firstName+" "+lastName;
    const instructor = {
      firstName,
      lastName,
      userName,
      password,
      country,
      phoneNumber,
      address,
      email,
      gender,
      role,
      bio,
      confirm
    };
    axios
      .post("/create/instructor", instructor)
      .then((res) => {
        setFirstName("");
        setLastName("");
        setUserName("");
        setPassword("");
        setCountry("");
        setPhoneNumber("");
        setAddress("");
        setEmail("");
        setGender("");
        setError("");
        setHtml("New Instructor Added");
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
    <form className="create-instructor" onSubmit={handleSubmit} validate>
      <h3>Instructor: Insert Your Information</h3>

      <label>First name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        required
        value={firstName}
      />

      <label>Last name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        required
        value={lastName}
      />

      <label>User name:</label>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        required
        value={userName}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
        value={password}
      />

      <label>Country:</label>
      <input
        type="text"
        onChange={(e) => setCountry(e.target.value)}
        required
        value={country}
      />

      <label>Phone Number:</label>
      <input
        type="number"
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        value={phoneNumber}
      />

      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        required
        value={address}
      />

      <label>Email: </label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        required
        value={email}
      />

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

      <Button variant="contained" type="submit">
        Submit
      </Button>
      {error !== "" && <p><strong>{error}</strong></p>}
      <p><strong>{html}</strong></p>
    </form>
  );
};

export default InstructorForm;
