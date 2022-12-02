import { useEffect, useState } from "react"
//import CourseDetails from '../webcomponents/CourseDetails';
import TraineeSearch from "../webcomponents/TraineeSearch";
import TraineePassword from "../webcomponents/TraineePassword";



const TraineeLobby = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    const [courses, setCourses] = useState(null);
    const [Trainee, setPassword] = useState(null);
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
// useEffect(() => {
//     const fetchCourses = async () => {
//         const response = await fetch('/CorpTrainee/password/:id');
//         const json = await response.json();

//         if(response.ok){
//             setPassword(json)
            
//         }
//     }
//     fetchCourses();
// }, [])


    // const renderDetails = (key,course) =>{
    //     console.log(course)
    //     return (  
  
    //         <CourseDetails key={key} course = {course} />
          
    //     )

    // }
    return (
        <div className="home-lobby">
     {/* do this later for corp id {?corpId=${course._id}} */}
            <button type="button" className="btn-view" onClick={() => window.location.href=`/viewtraineecourses`}>View Courses</button>
            Welcome to RADS Online Course Provider (TraineeLobby side)
            <TraineeSearch rateVal = {props.rateVal} currencyVal={props.currencyVal}/>
        </div>

        
    )
}


export default TraineeLobby;