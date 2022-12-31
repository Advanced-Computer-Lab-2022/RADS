import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Button } from "@mui/material";

const InstructorUpdateBio = (props) => {
  const { rateVal, currencyVal, token } = props;
  const decode = jwt_decode(token);
  const instructorId = decode.id;
  const [bio, setBio] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    const instructor = { bio };
    axios
      .patch(`/instructor/changeInfo/${instructorId}`, instructor)
      .then((res) => {
        setBio("");
        console.log("Info Changed", res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className="change-info" onSubmit={handleSubmit}>
      <h3>Change Your Bio</h3>
      <label>Bio:</label>
      <input type="text" onChange={(e) => setBio(e.target.value)} value={bio} />
      <Button variant="contained">Submit</Button>
    </form>
  );
};

export default InstructorUpdateBio;
