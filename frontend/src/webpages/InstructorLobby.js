// Components
import CourseCreate from "../webcomponents/CourseCreate"
import SearchCourse from "../webcomponents/SearchCourse"
import InstructorUpdateEmail from "../webcomponents/InstructorUpdateEmail"
import InstructorUpdatePassword from "../webcomponents/InstructorUpdatePassword"
import InstructorUpdateBio from "../webcomponents/InstructorUpdateBio"

const InstructorLobby = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    

    return ( <div className = "lobby" >
        <SearchCourse rateVal = {props.rateVal} currencyVal = { props.currencyVal } token ={props.token}/> 
        <div className = "course-add" >
        <CourseCreate rateVal = {props.rateVal} currencyVal = { props.currencyVal } token ={props.token}/>
         </div>
          <InstructorUpdateEmail rateVal = {props.rateVal} currencyVal = { props.currencyVal } token ={props.token} />
        <InstructorUpdatePassword rateVal = {props.rateVal} currencyVal = { props.currencyVal } token ={props.token} />
        <InstructorUpdateBio rateVal = {props.rateVal} currencyVal = { props.currencyVal } token ={props.token} /> {
            /* <div className="instructor-list">
                                    <ViewProfileButton />
                                    </div> */
        }
        </div>
    )
}


export default InstructorLobby;