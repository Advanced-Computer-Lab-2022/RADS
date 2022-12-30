import { Box } from "@mui/material";

const AdminDetails = ({admin}) =>{
    return(
        <Box className="admin-details">
            <h4><strong>username: {admin.userName}</strong></h4>
            <p><strong>password: </strong>{admin.password}</p>
           
        </Box>
    )
}


export default AdminDetails;