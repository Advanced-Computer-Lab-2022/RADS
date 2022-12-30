import { Box } from "@mui/material";

const InstructorDetails = ({instructor}) =>{
    return(
        <Box className="instructor-details">
            <h4>The information of user: {instructor.userName}</h4>
            <p><strong>First Name: </strong>{instructor.firstName}</p>
            <p><strong>Last Name: </strong>{instructor.lastName}</p>
        </Box>
    )
}


export default InstructorDetails;