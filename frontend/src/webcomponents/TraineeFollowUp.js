import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const TraineeFollowUp = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const traineeId = params.get('traineeId');
    const reportId = params.get('reportId');
    const [trainee, setTrainee] = useState([]);
    const [report, setReport] = useState([]);
    const [traineeComment, setTraineeComment] = useState('');

    useEffect(() => {
        const fetchTrainee = async () => {
            axios
                .get(`/trainee/${traineeId}`)
                .then((res) => {
                    setTrainee(res.data);
                    fetchReport();
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchTrainee();
    }, [])

    const fetchReport = async () => {
        const response = await fetch(`/report/request/${reportId}`);
        const json = await response.json();
        if (response.ok) {
            setReport(json);
        }
    }
    const postComment = async () => {
        const body = { traineeComment }
        const response = await fetch(`/report/traineepostcomment/${reportId}`, {
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
        <Box>
            <h3><strong>Report Follow up:</strong></h3>
            <Box className="some-container">
                <p><strong>Information of The Report</strong></p>
                <p>Sender: {trainee.firstName} {trainee.lastName}</p>
                <p>Type of problem: {report.requestType}</p>
                <Box>Comment/Comments: {report.traineeComments && report.traineeComments.map((comment, index2) => (<p><strong>Comment {index2 + 1}: </strong>{comment.traineeComment}</p>))}</Box>
                <p>Report Status:<strong>{report.reportStatus}</strong></p>
                {report.adminCommment ? (<Box><p>Admin Reply:{report.adminCommment} </p></Box>)
                    : (
                        "No Admin Reply"
                    )}
                <form onSubmit={handleSubmit}>
                    <TextField label="Add another comment" value={traineeComment} onChange={(e) => setTraineeComment(e.target.value)}></TextField>
                    <Button
          variant="contained" type="submit">Submit</Button>
                </form>
            </Box>
        </Box>

    )
}

export default TraineeFollowUp;