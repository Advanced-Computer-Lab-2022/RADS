import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';


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
            const response = await fetch(`/corptrainee/${corpTraineeId}`);
            const json = await response.json();
            if (response.ok) {
                setCorpTrainee(json);
                findResolvedCurrentReports();
                findUnresolvedCurrentReports();
            }
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
        <div>
            <h3><strong>VIEW YOUR REPORTS</strong></h3>
            {resolvedReports.length === 0 && unResolvedReports.length === 0 ? (<div>You dont have any reports.</div>) : (<div>

                {resolvedReports.length !== 0 ? (<div><h1>Resolved Reports</h1>

                    {resolvedReports && resolvedReports.map((report, index) => (
                        <div className="some-container">
                            <p><strong>Information of Report {index + 1}:</strong></p>
                            <p>Sender: {corpTrainee.firstName} {corpTrainee.lastName}</p>
                            <p>Type of problem: {report.requestType}</p>
                            <div>Comment/Comments: {report.corptTraineeComments && report.corptTraineeComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.corptTraineeComment}</p>))}</div>
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
                {unResolvedReports.length !== 0? (<div><h1>Unresolved Reports</h1>
                    {unResolvedReports && unResolvedReports.map((report, index1) => (
                        <div className="some-container">
                            <p><strong>Information of Report {index1 + 1}:</strong></p>
                            <p>Sender: {corpTrainee.firstName} {corpTrainee.lastName}</p>
                            <p>Type of problem: {report.requestType}</p>
                            <div>Comment/Comments: {report.corptTraineeComments && report.corptTraineeComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.corptTraineeComment}</p>))}</div>
                            <button onClick={() => window.location.href = `/corptraineefollowup?reportId=${report._id}&corpTraineeId=${corpTraineeId}`}>Follow Up</button>
                        </div>
                    ))}</div>)
                    : (
                        ""
                    )}

            </div>)}
        </div>

    )
}

export default CorpTraineeViewReports;