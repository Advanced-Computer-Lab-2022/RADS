import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import axios from "axios";

const InstructorViewReports = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const instructorId = params.get('instructorId');
    const [instructor, setInstructor] = useState([]);
    const [resolvedReports, setResolvedReports] = useState([]);
    const [unResolvedReports, setUnResolvedReports] = useState([]);


    useEffect(() => {
        const fetchInstructor = async () => {
            axios
            .get(`/instructor/${instructorId}`)
            .then((res) => {
                setInstructor(res.data);
                findResolvedCurrentReports();
                findUnresolvedCurrentReports();
            })
            .catch((error) => {
                console.error(error)
            })
        }
        fetchInstructor();
    }, [])


    const findResolvedCurrentReports = async () => {
        const response = await fetch(`/report/getinstructorresolved/${instructorId}`);
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            setResolvedReports(json);
        }
    }

    const findUnresolvedCurrentReports = async () => {
        const response = await fetch(`/report/getinstructorunresolved/${instructorId}`);
      
        const json = await response.json();
        console.log(json)
        if (response.ok) {
            setUnResolvedReports(json);
        }
    }
    return (
        <div>
        <h3><strong>VIEW YOUR REPORTS</strong></h3>
        {resolvedReports.length === 0 && unResolvedReports.length === 0 ? (<div>You dont have any reports.</div>) : (<div>

            {resolvedReports.length !== 0  ? (<div><h4>Resolved Reports</h4>

                {resolvedReports && resolvedReports.map((report, index) => (
                    <div className="some-container">
                        <p><strong>Information of Report {index + 1}:</strong></p>
                        <p>Sender: {instructor.firstName} {instructor.lastName}</p>
                        <p>Type of problem: {report.requestType}</p>
                        <div>Comment/Comments: {report.instructorComments && report.instructorComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.instructorComment}</p>))}</div>
                        <p>Report Status:<strong>{report.reportStatus}</strong></p>
                        {report.adminCommment ? (<div><p>Admin Reply:{report.adminCommment} </p></div>)
                            : (
                                "No Admin Reply"
                            )}
                    </div>
                ))}</div>)
                : (
                    ""
                )}
            {unResolvedReports.length !== 0 ? (<div><h4>Unresolved Reports</h4>
                {unResolvedReports && unResolvedReports.map((report, index1) => (
                    <div className="some-container">
                        <p><strong>Information of Report {index1 + 1}:</strong></p>
                        <p>Sender: {instructor.firstName} {instructor.lastName}</p>
                        <p>Type of problem: {report.requestType}</p>
                        <div>Comment/Comments: {report.instructorComments && report.instructorComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.instructorComment}</p>))}</div>
                        <button onClick={() => window.location.href = `/instructorfollowup?reportId=${report._id}&instructorId=${instructorId}`}>Follow Up</button>
                    </div>
                ))}</div>)
                : (
                    ""
                )}

        </div>)}
    </div>

        
    )
}

export default InstructorViewReports;