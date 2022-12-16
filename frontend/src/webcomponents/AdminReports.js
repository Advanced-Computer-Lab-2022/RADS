import { Link } from "@mui/material";
import { useState,useEffect } from "react"


const AdminReports = (props) => {
    const{
        rateVal,
        currencyVal
    } = props;
    const [refundRequests, setRefundRequests] = useState([]);
    const [accessRequests, setAccessRequests] = useState([]);

    useEffect(() => {
        const fetchRefundRequests = async () => {
            const response = await fetch('/report/requests/refund');
            const json = await response.json();
            if (response.ok) {
                setRefundRequests(json);
                fetchAccessRequests();
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
    return (
        <div>
            <h3><strong>View all requests:</strong></h3>
            <div>
                <p><strong>Refund Requests</strong></p>
                {refundRequests && refundRequests.map((request, index) => (
                   <Link onClick={() => window.location.href = `/adminrefunds?courseId=${request.courseId}&traineeId=${request.traineeId}&requestId=${request._id}`}>Request {index+1}</Link>
                ))}
            </div>
            <br/>
            <div>
                <p><strong>Access Requests</strong></p>
                {accessRequests && accessRequests.map((request, index1) => (
                   <Link onClick={() => window.location.href = `/adminaccess?courseId=${request.courseId}&corptraineeId=${request.corpTraineeId}&requestId=${request._id}`}>Request {index1+1}</Link>
                ))}
            </div>
        </div>
    )
}



export default AdminReports;