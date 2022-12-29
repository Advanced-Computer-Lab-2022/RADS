import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from "axios";

const CorpTraineeReport = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const corpTraineeId = params.get('corpTraineeId');
    const [course, setCourse] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [exists, setExists] = useState(false);
    const [balanceHtml, setBalanceHtml] = useState("");
    const [reports, setReports] = useState([]);
    const [requestType, setRequestType] = useState('');
    const [corpTraineeComment, setCorpTraineeComment] = useState('');

    const [html, setHtml] = useState('');


    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchCorpTrainee();
            }
        }
        fetchCourse();
    }, [])


    const fetchCorpTrainee = async () => {
        axios
            .get(`/corptrainee/${corpTraineeId}`)
            .then((res) => {
                setCorpTrainee(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const fetchInstructor = async (instID) => {
        axios
            .get(`/instructor/${instID}`)
            .then((res) => {
                setinstructorName(res.data.firstName + " " + res.data.lastName);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const postRequest = async () => {
        const info = {corpTraineeId,requestType,courseId}
        const response = await fetch(`/report/postrequest`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (response.ok) {
            postComment(json);
        }
    }

    const postComment = async (reportId) => {
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
            console.log(json);
            setHtml("Request Sent Successfully.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postRequest();
    }

    return (
        <Box>
            <h3>Report a problem</h3>
            <p><strong>In course: {course.courseTitle}</strong></p>
            <br/>
            <form className="traineereport-submit" onSubmit={handleSubmit}>
                <Box sx={{ minWidth: 200 }}>
                    <FormControl sx={{minWidth:200}}>
                        <InputLabel id="demo-simple-select-label">Type of problem</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={requestType}
                            label="Age"
                            onChange={(e)=> setRequestType(e.target.value)}
                        >
                            <MenuItem value="Financial">Financial</MenuItem>
                            <MenuItem value="Technical">Technical</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{minWidth:300,minHeight:200}} >
                <label></label>
                <br/>
                <br/>
                <TextField  multiline rows={4} label="Enter Your Comment/Reasoning" sx={{minWidth:300,minHeight:100}}  type="text" value= {corpTraineeComment} onChange={(e)=>setCorpTraineeComment(e.target.value)} />
                </Box>
                <button type="submit">Submit</button>
            </form>

            <p><strong>{html}</strong></p>
        </Box>
    )
}

export default CorpTraineeReport;