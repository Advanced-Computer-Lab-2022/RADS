import { useEffect, useState } from "react"

// components
import InstructorDetails from '../webcomponents/InstructorDetails'
import CorpTraineeDetails from '../webcomponents/CorpTraineeDetails'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Typography } from "@mui/material"
import InstructorForm from "../webcomponents/InstructorForm"
import CorpTraineeForm from "../webcomponents/CorpTraineeForm"
import AdminForm from "../webcomponents/AdminForm"
import NewAdminButton from "../webcomponents/NewAdminButton"
import AdminDetails from "../webcomponents/AdminDetails"
import jwt_decode from "jwt-decode";
import axios from "axios"
import { ExpandMore } from "@mui/icons-material"
import { color } from "@mui/system"
import AdminCorpTraineeList from "../webcomponents/AdminCorpTraineeList"
import AdminInstructorList from "../webcomponents/AdminInstructorList"
import AdminsList from "../webcomponents/AdminsList"

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

    return (
      <Box className="admin-lobby">
        <Box className="instructors">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <p className="highview-p">
                  <strong>Admins List</strong>
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Box className="card-container">
                  {admin &&
                    admin.map((admin) => (
                      <Box sx={{ margin: "2rem" }} className="card-border">
                        <AdminsList key={admin._id} admin={admin} />
                      </Box>
                    ))}
                </Box>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <p className="highview-p">
                  <strong>Corprate Trainees List</strong>
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Box className="card-container">
                  {corpTrainees &&
                    corpTrainees.map((corpTrainee) => (
                      <Box sx={{ margin: "2rem" }} className="card-border">
                        <AdminCorpTraineeList
                          key={corpTrainee._id}
                          corpTrainee={corpTrainee}
                        />
                      </Box>
                    ))}
                </Box>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <p className="highview-p">
                  <strong>Instructors List</strong>
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Box className="card-container">
                  {instructors &&
                    instructors.map((instructor) => (
                      <Box sx={{ margin: "2rem" }} className="card-border">
                        <AdminInstructorList
                          key={instructor._id}
                          instructor={instructor}
                        />
                      </Box>
                    ))}
                </Box>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Box className="card-border">
            <AdminForm
              rateVal={props.rateVal}
              currencyVal={props.currencyVal}
              token={props.token}
            />
          </Box>
        </Box>
      </Box>
    );
}


export default Admin