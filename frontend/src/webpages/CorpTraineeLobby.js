import { useEffect, useState } from "react"
import CorpTraineeSearch from "../webcomponents/CorpTraineeSearch";
import CorpTraineePassword from "../webcomponents/CorpTraineePassword";
import AppBar  from "../webcomponents/AppNavBar";
import { Box } from "@mui/material";


const CorpTraineeLobby = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const [courses, setCourses] = useState(null);
    const [corpTrainee, setPassword] = useState(null);
    useEffect(() => {
        const fetchCourses = async() => {
            const response = await fetch('/course');
            const json = await response.json();

            if (response.ok) {
                setCourses(json)

            }
        }
        fetchCourses();
    }, [])
    useEffect(() => {
        const fetchCourses = async() => {
            const response = await fetch('/corptrainee/password/:id');
            const json = await response.json();

            if (response.ok) {
                setPassword(json)

            }
        }
        fetchCourses();
    }, [])


    // const renderDetails = (key,course) =>{
    //     console.log(course)
    //     return (  

    //         <CourseDetails key={key} course = {course} />

    //     )

    return ( 
    <Box className = "home-lobby" >
        <CorpTraineeSearch rateVal = { props.rateVal } currencyVal = { props.currencyVal } token ={props.token}/> 
        <CorpTraineePassword rateVal = { props.rateVal } currencyVal = { props.currencyVal } token ={props.token}/>
        </Box>
    )
}


export default CorpTraineeLobby;