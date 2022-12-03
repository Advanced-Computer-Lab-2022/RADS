import { useEffect, useState } from "react"
//import CourseDetails from '../webcomponents/CourseDetails';
import CorpTraineeSearch from "../webcomponents/CorpTraineeSearch";
import CorpTraineePassword from "../webcomponents/CorpTraineePassword";


const CorpTraineeLobby = (props) => {
    const {
        rateVal,
        currencyVal
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
            const response = await fetch('/CorpTrainee/password/:id');
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

    // }
    return ( <
        div className = "home-lobby" >
        Welcome to RADS Online Course Provider(CorpTraineeLobby side) <
        CorpTraineeSearch rateVal = { props.rateVal }
        currencyVal = { props.currencyVal }
        /> <
        CorpTraineePassword / >
        <
        /div>
    )
}


export default CorpTraineeLobby;