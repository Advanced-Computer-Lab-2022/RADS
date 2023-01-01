import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Box, Button } from "@mui/material";
const NewAdminButton = (props) => {
  const { rateVal, currencyVal, token } = props;
  const decode = jwt_decode(token);
  const adminId = decode.id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);
  const [html, setHtml] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    let confirm = password;
    let role = "ADMIN";
    const admin = {
      firstName,
      lastName,
      userName,
      email,
      role,
      gender,
      password,
      confirm,
    };
    console.log(admin);
    axios
      .post("/create/admin", admin)
      .then((res) => {
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setGender("");
        setError(null);
        setHtml("New Admin Created");
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
    <div>
      <h2> Add new admin: </h2>
      <form className="create-admin" onSubmit={handleSubmit}>
        <label>First name:</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
        />

        <label>Last name:</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />

        <label>User name:</label>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        />

        <label>Email:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
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
          Create Admin
        </Button>
        {error && <p><strong>{error}</strong></p>}
        <p><strong>{html}</strong></p>
      </form>
    </div>
  );
};

export default NewAdminButton;
