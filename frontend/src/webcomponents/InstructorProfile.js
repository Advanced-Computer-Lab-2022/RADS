import { Box } from "@mui/material";

export const InstructorProfile = ({ instructor }) => {
  return (
    <Box className="instructor-profile">
      <h4>The information of user: {instructor.userName}</h4>
      <p>
        <strong>First Name: </strong>
        {instructor.firstName}
      </p>
      <p>
        <strong>Last Name: </strong>
        {instructor.lastName}
      </p>
    </Box>
  );
};

export default InstructorProfile;
