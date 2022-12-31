import { Box } from "@mui/material";

const courses = [
  "Media and Network Lab, ",
  " Concepts of Programming Languages, ",
  " Computer Graphics",
];

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
      <p>
        <strong>Country: </strong>
        {instructor.country}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {instructor.phoneNumber}
      </p>
      <p>
        <strong>Address: </strong>
        {instructor.address}
      </p>
      <p>
        <strong>Courses taught: </strong>
        {courses}{" "}
      </p>
    </Box>
  );
};

export default InstructorProfile;
