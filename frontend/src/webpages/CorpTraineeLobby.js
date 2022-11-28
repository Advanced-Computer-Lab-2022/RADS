import { useEffect, useState } from "react"
//import CourseDetails from '../webcomponents/CourseDetails';
import CorpTraineeSearch from "../webcomponents/CorpTraineeSearch";


const CorpTraineeLobby = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    const [courses, setCourses] = useState(null);
   useEffect(() => {
    const fetchCourses = async () => {
        const response = await fetch('/course');
        const json = await response.json();

        if(response.ok){
            setCourses(json)
            
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
        <div className="home-lobby">
            Welcome to RADS Online Course Provider (CorpTraineeLobby side)
            <div className="selectCountry">
                <p> </p>
            </div>
            <p> </p>
            <CorpTraineeSearch rateVal = {props.rateVal} currencyVal={props.currencyVal}/>
        </div>
    )
}


export default CorpTraineeLobby;