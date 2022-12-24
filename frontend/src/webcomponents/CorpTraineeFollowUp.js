import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import { TextField } from "@mui/material";
import axios from "axios";

const CorpTraineeFollowUp = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const corpTraineeId = params.get('corpTraineeId');
    const reportId = params.get('reportId');
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [report, setReport] = useState([]);
    const [corpTraineeComment,setCorpTraineeComment] = useState('');

    useEffect(() => {
        const fetchCorpTrainee = async () => {
            axios
            .get(`/corptrainee/${corpTraineeId}`)
            .then((res) => {
                setCorpTrainee(res.data);
                fetchReport();
            })
            .catch((error) => {
                console.error(error)
            })
        }
        fetchCorpTrainee();
    }, [])

    const fetchReport = async () => {
        const response = await fetch(`/report/request/${reportId}`);
        const json = await response.json();
        if (response.ok) {
            setReport(json);
        }
    }
    const postComment = async () => {
        const body = {corpTraineeComment}
        const response = await fetch(`/report/corptraineepostcomment/${reportId}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            window.location.reload();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postComment();
    }

    
    return (
        <div>
            <h3><strong>Report Follow up:</strong></h3>
                        <div className="some-container">
                            <p><strong>Information of The Report</strong></p>
                            <p>Sender: {corpTrainee.firstName} {corpTrainee.lastName}</p>
                            <p>Type of problem: {report.requestType}</p>
                            <div>Comment/Comments: {report.corptTraineeComments && report.corptTraineeComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.corptTraineeComment}</p>))}</div>
                            <p>Report Status:<strong>{report.reportStatus}</strong></p>
                            {report.adminCommment ? (<div><p>Admin Reply:{report.adminCommment} </p></div>)
                                : (
                                    "No Admin Reply"
                                )}
                            <form onSubmit={handleSubmit}>
                            <TextField label="Add another comment"value ={corpTraineeComment} onChange={(e) =>setCorpTraineeComment(e.target.value)}></TextField>
                            <button type="submit">Submit</button>
                            </form>
                        </div>
        </div>

    )
}

export default CorpTraineeFollowUp;