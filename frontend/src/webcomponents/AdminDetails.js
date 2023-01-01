import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const adminId = params.get("adminId");

  const [Admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      axios
        .get(`/admin/${adminId}`)
        .then((res) => {
          setAdmin(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchAdmin();
  }, []);

  return (
    <Box className="admin-details card-border">
      <h4>The information of user: {Admin.userName}</h4>
      <p>
        <strong>First Name: </strong>
        {Admin.firstName}
      </p>
      <p>
        <strong>Last Name: </strong>
        {Admin.lastName}
      </p>
      <p>
        <strong>Gender: </strong>
        {Admin.gender}
      </p>
      <p>
        <strong>Email: </strong>
        {Admin.email}
      </p>
    </Box>
  );
};

export default AdminDetails;
