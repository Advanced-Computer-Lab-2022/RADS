import { Box } from "@mui/material";

const AdminInstructorList = ({ instructor }) => {
  return (
    <Box className="instructor-details">
      <h4>The information of user: {instructor.userName}</h4>
      <p>
        <strong>First Name: </strong>
        {instructor.firstName}
      </p>
      <p>
        <strong>Last Name: </strong>
        {instructor.lastName}
      </p>
      <p>
        <strong>Country: </strong>
        {instructor.country}
      </p>
      <p>
        <strong>Gender: </strong>
        {instructor.gender}
      </p>
      <p>
        <strong>Email: </strong>
        {instructor.email}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {instructor.phoneNumber}
      </p>
      <p>
        <strong>address: </strong>
        {instructor.address}
      </p>
    </Box>
  );
};

export default AdminInstructorList;
