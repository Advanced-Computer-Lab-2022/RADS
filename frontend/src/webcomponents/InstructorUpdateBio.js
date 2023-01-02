import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Box, Button } from "@mui/material";

const InstructorUpdateBio = (props) => {
  const { rateVal, currencyVal, token } = props;
  const decode = jwt_decode(token);
  const instructorId = decode.id;
  const [bio, setBio] = useState("");
  const [html, setHtml] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    const instructor = { bio };
    axios
      .patch(`/instructor/changeInfo/${instructorId}`, instructor)
      .then((res) => {
        setBio("");
        setHtml("Email changed successfully")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box className="card-border">
      <form className="change-info" onSubmit={handleSubmit}>
        <h3>Change Your Bio</h3>
        <label>Bio:</label>
        <input type="text" onChange={(e) => setBio(e.target.value)} value={bio} />
        <Button type = 'submit'variant="contained">Submit</Button>
        <p><strong>{html}</strong></p>
      </form>
    </Box>
  );
};

export default InstructorUpdateBio;
