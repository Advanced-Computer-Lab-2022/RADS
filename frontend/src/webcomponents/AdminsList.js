import { Box } from "@mui/material";

const AdminsList = ({ admin }) => {
  return (
    <Box className="admin-details">
      <h4>
        <strong>username: {admin.userName}</strong>
      </h4>
      <p>
        <strong>password: </strong>
        {admin.password}
      </p>
      <p>
        <strong>First Name: </strong>
        {admin.firstName}
      </p>
      <p>
        <strong>Last Name: </strong>
        {admin.lastName}
      </p>
      <p>
        <strong>Gender: </strong>
        {admin.gender}
      </p>
      <p>
        <strong>Email: </strong>
        {admin.email}
      </p>
    </Box>
  );
};

export default AdminsList;
