// Components
import CourseCreate from "../webcomponents/CourseCreate"
import SearchCourse from "../webcomponents/SearchCourse"
import InstructorUpdateEmail from "../webcomponents/InstructorUpdateEmail"
import InstructorUpdatePassword from "../webcomponents/InstructorUpdatePassword"
import InstructorUpdateBio from "../webcomponents/InstructorUpdateBio"
import { Box } from "@mui/material"

const InstructorLobby = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    

    return ( <Box className = "lobby" >
        <SearchCourse rateVal = {props.rateVal} currencyVal = { props.currencyVal } token ={props.token}/> 
        </Box>
    )
}


export default InstructorLobby;