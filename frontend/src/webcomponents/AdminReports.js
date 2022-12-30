import { Box, Button, Link } from "@mui/material";
import { useState, useEffect } from "react"
import axios from "axios";

const AdminReports = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const [refundRequests, setRefundRequests] = useState([]);
    const [accessRequests, setAccessRequests] = useState([]);
    const [problems, setProblems] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('adminId');

    useEffect(() => {
        const fetchRefundRequests = async () => {
            const response = await fetch('/report/requests/refund');
            const json = await response.json();
            if (response.ok) {
                setRefundRequests(json);
                fetchAccessRequests();
                fetchProblems();
            }
        }
        fetchRefundRequests();
    }, [])

    const fetchAccessRequests = async () => {
        const response = await fetch('/report/requests/access');
        const json = await response.json();
        if (response.ok) {
            setAccessRequests(json);
        }
    }

    const fetchProblems = async () => {
        const response = await fetch('/report/requests/allproblems');
        const json = await response.json();
        if (response.ok) {
            setProblems(json);
        }
    }

    const handleDelete = async(e) =>{
        e.preventDefault();
        let requestId = e.target.value;
        const response = await fetch(`/report/deleterequest/${requestId}`, {
            method: 'DELETE',
        })
        const json = await response.json();
        if (response.ok) {
           window.location.reload();
        }
    }
    return (
        <Box>
            <Box>
                <h3><strong>View all requests:</strong></h3>
                <Box>
                    <p><strong>Refund Requests</strong></p>
                    {refundRequests && refundRequests.map((request, index) => (
                        <Box>
                            <Link onClick={() => window.location.href = `/adminrefunds?adminId=${adminId}&courseId=${request.courseId}&traineeId=${request.traineeId}&requestId=${request._id}`}>Request {index + 1}, Status: {request.reportStatus}</Link>
                            <Button
          variant="contained" value = {request._id} onClick={handleDelete}>Delete Request/Report</Button>
                            <br />
                        </Box>
                    ))}
                </Box>
                <br />
                <Box>
                    <p><strong>Access Requests</strong></p>
                    {accessRequests && accessRequests.map((request, index1) => (
                        <Box>
                            <Link onClick={() => window.location.href = `/adminaccess?adminId=${adminId}&courseId=${request.courseId}&corptraineeId=${request.corpTraineeId}&requestId=${request._id}`}>Request {index1 + 1}, Status: {request.reportStatus}</Link>
                            <Button
          variant="contained" value = {request._id} onClick={handleDelete}>Delete Request/Report</Button>
                            <br />
                        </Box>
                    ))}
                </Box>
                <br />
                <Box>
                    <p><strong>Reported Problems</strong></p>
                    {problems && problems.map((problem, index2) => (
                        <Box>
                            <Link onClick={() => window.location.href = `/adminproblems?adminId=${adminId}&courseId=${problem.courseId}&requestId=${problem._id}`}>Request {index2 + 1}, Status: {problem.reportStatus}</Link>
                            <Button
          variant="contained" value = {problem._id} onClick={handleDelete}>Delete Request/Report</Button>
                            <br />
                        </Box>
                    ))}
                </Box>
            </Box>
           

        </Box>
    )
}



export default AdminReports;