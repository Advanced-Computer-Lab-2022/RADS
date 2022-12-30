import { useEffect, useState } from "react"

// components
import InstructorDetails from '../webcomponents/InstructorDetails'
import CorpTraineeDetails from '../webcomponents/CorpTraineeDetails'
import { Box, Button } from "@mui/material"
import InstructorForm from "../webcomponents/InstructorForm"
import CorpTraineeForm from "../webcomponents/CorpTraineeForm"
import AdminForm from "../webcomponents/AdminForm"
import NewAdminButton from "../webcomponents/NewAdminButton"
import AdminDetails from "../webcomponents/AdminDetails"
import jwt_decode from "jwt-decode";
import axios from "axios"

const Admin = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const decode = jwt_decode(token);
    const adminId = decode.id;
    const [instructors, setInstructors] = useState(null);
    const [corpTrainees, setCorpTrainees] = useState(null);
    const [admin, editAdmin] = useState(null);
    useEffect(() => {
        const fetchCorpTrainees = async () => {
            axios
                .get('/corptrainee')
                .then((res) => {
                    setCorpTrainees(res.data);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchCorpTrainees();
    }, [])

    useEffect(() => {
        const fetchInstructors = async () => {
            axios
                .get('/instructor')
                .then((res) => {
                    setInstructors(res.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchInstructors();
    }, [])
    useEffect(() => {
        const fetchAdmins = async () => {
            axios
                .get('/admin')
                .then((res) => {
                    editAdmin(res.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchAdmins();
    }, [])

    return (<Box className="admin-lobby" >
        <Box className="instructors" >
            <Button variant="contained" onClick={() => window.location.href = `/adminreports?adminId=${adminId}`}>View Requests & Reports</Button>
            <Button variant="contained" onClick={() => window.location.href = `/admininsertcorp?adminId=${adminId}`}>Insert a corperate trainee</Button>
            <Box>
                <h3><strong>Set up promotion for course/courses</strong></h3>
                <br />
                <Button variant="contained"  onClick={() => window.location.href = `/adminpromotion?adminId=${adminId}`}>Add Promo</Button>
            </Box>
            <h2 > Admins: </h2> {
                admin && admin.map((admin) => (
                    <AdminDetails key={admin._id} admin={admin} />
                ))
            } <h2> === === === === === === === === === === === === === === === === === === === === === = </h2>
            <h2 >corpTrainees: </h2> {
                corpTrainees && corpTrainees.map((corpTrainee) => (
                    <CorpTraineeDetails key={corpTrainee._id} corpTrainee={corpTrainee} />
                ))
            } <h2> === === === === === === === === === === === === === === === === === === === === === = </h2>
            <h2>Instructors: </h2> {
                instructors && instructors.map((instructor) => (
                    // <p key = {instructor._id}>{instructor.userName}</p>
                    <InstructorDetails key={instructor._id} instructor={instructor} />
                ))
            }
      
        </Box> <InstructorForm rateVal = { props.rateVal } currencyVal = { props.currencyVal } token ={props.token}/>
        <h2> === === === === === === === === === === === === === === === === === === === === === = </h2>
        <h2> === === === === === === === === === === === === === === === === === === === === === = </h2>
        <AdminForm rateVal = { props.rateVal } currencyVal = { props.currencyVal } token ={props.token} />
        <h2> === === === === === === === === === === === === === === === === === === === === === = </h2>
        <h2> Add new admin: </h2> <NewAdminButton rateVal = { props.rateVal } currencyVal = { props.currencyVal } token ={props.token}/>
    </Box>
    )
}


export default Admin