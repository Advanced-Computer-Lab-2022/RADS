import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import axios from "axios";

const TraineeViewReports = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const traineeId = params.get('traineeId');
    const [trainee, setTrainee] = useState([]);
    const [resolvedReports, setResolvedReports] = useState([]);
    const [unResolvedReports, setUnResolvedReports] = useState([]);


    useEffect(() => {
        const fetchTrainee = async () => {
            axios
            .get(`/trainee/${traineeId}`)
            .then((res) => {
                setTrainee(res.data);
                findResolvedCurrentReports();
                findUnresolvedCurrentReports();
            })
            .catch((error) => {
                console.error(error)
            })
        }
        fetchTrainee();
    }, [])


    const findResolvedCurrentReports = async () => {
        axios
            .get(`/report/gettraineeresolved/${traineeId}`)
            .then((res) => {
                setResolvedReports(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const findUnresolvedCurrentReports = async () => {
        axios
        .get(`/report/gettraineeunresolved/${traineeId}`)
        .then((res) => {
            setUnResolvedReports(res.data);
        })
        .catch((error) => {
            console.error(error)
        })
    }
    return (
        <div>
            <h3><strong>VIEW YOUR REPORTS</strong></h3>
            {resolvedReports.length === 0 && unResolvedReports.length  === 0 ? (<div>You dont have any reports.</div>) : (<div>

                {resolvedReports.length !== 0 ? (<div><h4>Resolved Reports</h4>

                    {resolvedReports && resolvedReports.map((report, index) => (
                        <div className="some-container">
                            <p><strong>Information of Report {index + 1}:</strong></p>
                            <p>Sender: {trainee.firstName} {trainee.lastName}</p>
                            <p>Type of problem: {report.requestType}</p>
                            <div>Comment/Comments: {report.traineeComments && report.traineeComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.traineeComment}</p>))}</div>
                            <p>Report Status: <strong>{report.reportStatus}</strong></p>
                            {console.log(report.reportStatus)}
                            {report.adminCommment ? (<div><p>Admin Reply:{report.adminCommment} </p></div>)
                                : (
                                    "No Admin Reply"
                                )}
                        </div>
                    ))}</div>)
                    : (
                        ""
                    )}
                {unResolvedReports.length !==0 ? (<div><h4>Unresolved Reports</h4>
                    {unResolvedReports && unResolvedReports.map((report, index1) => (
                        <div className="some-container">
                            <p><strong>Information of Report {index1 + 1}:</strong></p>
                            <p>Sender: {trainee.firstName} {trainee.lastName}</p>
                            <p>Type of problem: {report.requestType}</p>
                            <div>Comment/Comments: {report.traineeComments && report.traineeComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.traineeComment}</p>))}</div>
                            <button onClick={() => window.location.href = `/traineefollowup?reportId=${report._id}&traineeId=${traineeId}`}>Follow Up</button>
                        </div>
                    ))}</div>)
                    : (
                        ""
                    )}

            </div>)}
        </div>

    )
}

export default TraineeViewReports;