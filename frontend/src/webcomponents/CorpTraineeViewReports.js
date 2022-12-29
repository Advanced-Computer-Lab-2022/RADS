import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import axios from "axios";
import { Box } from "@mui/material";

const CorpTraineeViewReports = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const corpTraineeId = params.get('corpTraineeId');
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [resolvedReports, setResolvedReports] = useState([]);
    const [unResolvedReports, setUnResolvedReports] = useState([]);


    useEffect(() => {
        const fetchCorpTrainee = async () => {
            axios
            .get(`/corptrainee/${corpTraineeId}`)
            .then((res) => {
                setCorpTrainee(res.data);
                findResolvedCurrentReports();
                findUnresolvedCurrentReports();
            })
            .catch((error) => {
                console.error(error)
            })
        }
        fetchCorpTrainee();
    }, [])


    const findResolvedCurrentReports = async () => {
        const response = await fetch(`/report/getcorptraineeresolved/${corpTraineeId}`);
        const json = await response.json();
        if (response.ok) {
            setResolvedReports(json);
        }
    }

    const findUnresolvedCurrentReports = async () => {
        const response = await fetch(`/report/getcorptraineeunresolved/${corpTraineeId}`);
        const json = await response.json();
        if (response.ok) {
            setUnResolvedReports(json);
        }
    }
    return (
        <Box>
            <h3><strong>VIEW YOUR REPORTS</strong></h3>
            {resolvedReports.length === 0 && unResolvedReports.length === 0 ? (<Box>You dont have any reports.</Box>) : (<Box>

                {resolvedReports.length !== 0 ? (<Box><h1>Resolved Reports</h1>

                    {resolvedReports && resolvedReports.map((report, index) => (
                        <Box className="some-container">
                            <p><strong>Information of Report {index + 1}:</strong></p>
                            <p>Sender: {corpTrainee.firstName} {corpTrainee.lastName}</p>
                            <p>Type of problem: {report.requestType}</p>
                            <Box>Comment/Comments: {report.corptTraineeComments && report.corptTraineeComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.corptTraineeComment}</p>))}</Box>
                            <p>Report Status:<strong>{report.reportStatus}</strong></p>
                            {report.adminCommment ? (<Box><p>Admin Reply:{report.adminCommment} </p></Box>)
                                : (
                                    "No Admin Reply"
                                )}
                        </Box>
                    ))}</Box>)
                    : (
                        ""
                    )}
                {unResolvedReports.length !== 0? (<Box><h1>Unresolved Reports</h1>
                    {unResolvedReports && unResolvedReports.map((report, index1) => (
                        <Box className="some-container">
                            <p><strong>Information of Report {index1 + 1}:</strong></p>
                            <p>Sender: {corpTrainee.firstName} {corpTrainee.lastName}</p>
                            <p>Type of problem: {report.requestType}</p>
                            <Box>Comment/Comments: {report.corptTraineeComments && report.corptTraineeComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.corptTraineeComment}</p>))}</Box>
                            <button onClick={() => window.location.href = `/corptraineefollowup?reportId=${report._id}&corpTraineeId=${corpTraineeId}`}>Follow Up</button>
                        </Box>
                    ))}</Box>)
                    : (
                        ""
                    )}

            </Box>)}
        </Box>

    )
}

export default CorpTraineeViewReports;