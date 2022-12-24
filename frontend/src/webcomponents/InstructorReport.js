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

const InstructorReport = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const instructorId = params.get('instructorId');
    const [course, setCourse] = useState([]);
    const [instructor, setInstructor] = useState([]);
    const [exists, setExists] = useState(false);
    const [balanceHtml, setBalanceHtml] = useState("");
    const [reports, setReports] = useState([]);
    const [requestType, setRequestType] = useState('');
    const [instructorComment, setInstructorComment] = useState('');
    const [html, setHtml] = useState('');


    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor();
            }
        }
        fetchCourse();
    }, [])


    const fetchInstructor = async () => {
        axios
        .get(`/instructor/${instructorId}`)
        .then((res) => {
            setInstructor(res.data);
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    const postRequest = async () => {
        const info = {instructorComment,requestType,instructorId,courseId}
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
        const body = {instructorComment}
        const response = await fetch(`/report/instructorpostcomment/${reportId}`, {
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
        <div>
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
                <TextField  multiline rows={4} label="Enter Your Comment/Reasoning" sx={{minWidth:300,minHeight:100}}  type="text" value= {instructorComment} onChange={(e)=>setInstructorComment(e.target.value)} />
                </Box>
                <button type="submit">Submit</button>
            </form>

            <p><strong>{html}</strong></p>
        </div>
    )
}

export default InstructorReport;