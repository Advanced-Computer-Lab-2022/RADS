import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Box, Button } from "@mui/material";

const InstructorUpdatePassword = (props) => {
  const { rateVal, currencyVal, token } = props;
  const decode = jwt_decode(token);
  const instructorId = decode.id;
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("");
  const [html,setHtml] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    if (password !== confirm) {
      setHtml("Password do not match");
    } else {
      let id = instructorId;
      const info = { id, password };
      axios
        .post("/guest/changepassword", info)
        .then((res) => {
          setPassword("");
          setConfirm("");
          setError("");
          setHtml("Password changed successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Box className="card-border">
      <form className="change-info" onSubmit={handleSubmit}>
        <fieldset>
          <h3>Enter your new password</h3>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </fieldset>
        <br />
        <fieldset>
          <h3>Re-enter new password</h3>
          <input
            type="password"
            required
            onChange={(e) => setConfirm(e.target.value)}
            value={confirm}
          />
        </fieldset>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <p><strong>{html}</strong></p>
        {error !== "" && <p><strong>{error}</strong></p>}
      </form>
    </Box>
  );
};

export default InstructorUpdatePassword;
