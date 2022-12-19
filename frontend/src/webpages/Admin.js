import { useEffect, useState } from "react"

// components
import InstructorDetails from '../webcomponents/InstructorDetails'
import CorpTraineeDetails from '../webcomponents/CorpTraineeDetails'

import InstructorForm from "../webcomponents/InstructorForm"
import CorpTraineeForm from "../webcomponents/CorpTraineeForm"
import AdminForm from "../webcomponents/AdminForm"
import NewAdminButton from "../webcomponents/NewAdminButton"
import AdminDetails from "../webcomponents/AdminDetails"

const Admin = (props) => {
        const {
            rateVal,
            currencyVal
        } = props;
        const [instructors, setInstructors] = useState(null);
        const [corpTrainees, setCorpTrainees] = useState(null);
        const [admin, editAdmin] = useState(null);
        useEffect(() => {
            const fetchCorpTrainees = async() => {
                const response = await fetch('/corpTrainee');
                const json = await response.json();

                if (response.ok) {
                    setCorpTrainees(json)

                }
            }
            fetchCorpTrainees();
        }, [])

        useEffect(() => {
            const fetchInstructors = async() => {
                const response = await fetch('/Instructor');
                const json = await response.json();

                if (response.ok) {
                    setInstructors(json)

                }
            }
            fetchInstructors();
        }, [])
        useEffect(() => {
            const fetchAdmins = async() => {
                const response = await fetch('/Admin');
                const json = await response.json();

                if (response.ok) {
                    editAdmin(json)

                }
            }
            fetchAdmins();
        }, [])
        useEffect(() => {
            const fetchAdmins = async() => {
                const response = await fetch('/Admin');
                const json = await response.json();

                if (response.ok) {
                    editAdmin(json)

                }
            }
            fetchAdmins();
        }, [])

        return ( <div className = "admin-lobby" >
                <div className = "instructors" >
                <button onClick={() => window.location.href = `/adminreports`}>View Requests</button>
                <button onClick={() => window.location.href = `/adminproblems`}>View Reported Problems</button>
                <button onClick={() => window.location.href = `/adminpromotion`}>Set Promotion</button>
                <h2 > Admins: </h2> {
                admin && admin.map((admin) => (

                    <AdminDetails key = { admin._id } admin = { admin }/>
                ))
            } <h2> === === === === === === === === === === === === === === === === === === === === === = </h2>



        <h2 >corpTrainees: </h2> {
        corpTrainees && corpTrainees.map((corpTrainee) => (

            <CorpTraineeDetails key = { corpTrainee._id } corpTrainee = { corpTrainee }/>
        ))
    } <h2> === === === === === === === === === === === === === === === === === === === === === = </h2> 
    <h2>Instructors: </h2> {
instructors && instructors.map((instructor) => (
    // <p key = {instructor._id}>{instructor.userName}</p>
    <InstructorDetails key = { instructor._id } instructor = { instructor }/>
))
}

</div> <InstructorForm />
    <h2> === === === === === === === === === === === === === === === === === === === === === = </h2> 
    <h2> === === === === === === === === === === === === === === === === === === === === === = </h2> 
    <AdminForm/>
    <h2> === === === === === === === === === === === === === === === === === === === === === = </h2>
     <h2> Add new admin: </h2> <NewAdminButton/>
    </div>
)
}


export default Admin