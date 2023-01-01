import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const TraineeDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const traineeId = params.get("traineeId");

  const [Trainee, setTrainee] = useState([]);

  useEffect(() => {
    const fetchTrainee = async () => {
      axios
        .get(`/trainee/${traineeId}`)
        .then((res) => {
          setTrainee(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchTrainee();
  }, []);

  return (
    <Box className="corpTrainee-details card-border">
      <h4>The information of user: {Trainee.userName}</h4>
      <p>
        <strong>First Name: </strong>
        {Trainee.firstName}
      </p>
      <p>
        <strong>Last Name: </strong>
        {Trainee.lastName}
      </p>
      <p>
        <strong>Country: </strong>
        {Trainee.country}
      </p>
      <p>
        <strong>Gender: </strong>
        {Trainee.gender}
      </p>
      <p>
        <strong>Email: </strong>
        {Trainee.email}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {Trainee.phoneNumber}
      </p>
      <p>
        <strong>address: </strong>
        {Trainee.address}
      </p>
      <p>
        <strong>courses: </strong>
        {Trainee.courses}
      </p>
    </Box>
  );
};

export default TraineeDetails;
