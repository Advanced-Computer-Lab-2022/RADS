import { useEffect, useState } from "react"
//import CourseDetails from '../webcomponents/CourseDetails';
import TraineePassword from "../webcomponents/TraineePassword";
import TraineeSearch from "../webcomponents/TraineeSearch";


const TraineeLobby = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const [courses, setCourses] = useState(null);
    const [trainee, setPassword] = useState(null);
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
            const response = await fetch('/Trainee/password/:id');
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
    return ( 
       <div className = "home-lobby" >
        Welcome to RADS Online Course Provider(TraineeLobby side) 
        <TraineeSearch rateVal = {props.rateVal} currencyVal = {props.currencyVal}/>
        <TraineePassword />
        </div>
    )
}


export default TraineeLobby;