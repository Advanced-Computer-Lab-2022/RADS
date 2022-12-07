// Components
import CourseCreate from "../webcomponents/CourseCreate"
import SearchCourse from "../webcomponents/SearchCourse"
import InstructorUpdateEmail from "../webcomponents/InstructorUpdateEmail"
import InstructorUpdatePassword from "../webcomponents/InstructorUpdatePassword"
import InstructorUpdateBio from "../webcomponents/InstructorUpdateBio"

const InstructorLobby = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    

    return ( <div className = "lobby" >
        <SearchCourse rateVal = {props.rateVal} currencyVal = { props.currencyVal }/> 
        <div className = "course-add" >
        <CourseCreate rateVal = {props.rateVal} currencyVal = {props.currencyVal}/>
         </div>
          <InstructorUpdateEmail />
        <InstructorUpdatePassword />
        <InstructorUpdateBio /> {
            /* <div className="instructor-list">
                                    <ViewProfileButton />
                                    </div> */
        }
        </div>
    )
}


export default InstructorLobby;