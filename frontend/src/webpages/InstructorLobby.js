import { useEffect, useState } from "react"
// Components
import CourseCreate from "../webcomponents/CourseCreate"
import SearchCourse from "../webcomponents/SearchCourse"
import InstructorDetails from '../webcomponents/InstructorDetails'
import ViewProfileButton from "../webcomponents/ViewProfileButton";
const InstructorLobby = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    const [instructors, setInstructors] = useState(null);
    useEffect(() => {
        const fetchInstructors = async () => {
            const response = await fetch('/Instructor');
            const json = await response.json();
    
            if(response.ok){
                setInstructors(json)
                
            }
        }
        fetchInstructors();
    }, [])

    return (
        <div className="lobby">
             <SearchCourse rateVal ={props.rateVal}  currencyVal={props.currencyVal}/>
        <div className="course-add">
           <CourseCreate rateVal ={props.rateVal}  currencyVal={props.currencyVal}/>
        </div>
        {/* <div className="instructor-list">
                        <ViewProfileButton />
                        </div> */}
    
        </div>
        
    )
}


export default InstructorLobby;