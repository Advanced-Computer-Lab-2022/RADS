import { Box } from "@mui/material";

const AdminCorpTraineeList = ({ corpTrainee }) => {
  return (
    <Box className="corpTrainee-details">
      <h4>The information of user: {corpTrainee.userName}</h4>
      <p>
        <strong>First Name: </strong>
        {corpTrainee.firstName}
      </p>
      <p>
        <strong>Last Name: </strong>
        {corpTrainee.lastName}
      </p>
      <p>
        <strong>Country: </strong>
        {corpTrainee.country}
      </p>
      <p>
        <strong>Gender: </strong>
        {corpTrainee.gender}
      </p>
      <p>
        <strong>Email: </strong>
        {corpTrainee.email}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {corpTrainee.phoneNumber}
      </p>
      <p>
        <strong>address: </strong>
        {corpTrainee.address}
      </p>
    </Box>
  );
};

export default AdminCorpTraineeList;
