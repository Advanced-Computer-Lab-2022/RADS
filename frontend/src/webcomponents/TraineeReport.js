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

const TraineeReport = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const traineeId = params.get('traineeId');
    const [course, setCourse] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [traineeCourses, setTraineeCourses] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [traineeBalance, setTraineeBalance] = useState(0);
    const [exists, setExists] = useState(false);
    const [balanceHtml, setBalanceHtml] = useState("");
    const [reports, setReports] = useState([]);
    const [requestType, setRequestType] = useState('');
    const [traineeComment, setTraineeComment] = useState('');

    const [html, setHtml] = useState('');


    // const todayDate = new Date();
    // console.log(todayDate);
    // console.log(json.promotionEndDate);
    // const promoend = new Date(json.promotionEndDate);
    // console.log("course end date: ",promoend);
    // console.log("today date: ",todayDate);
    // console.log("here ",promoend > todayDate);

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchTrainee();
            }
        }
        fetchCourse();
    }, [])


    const fetchTrainee = async () => {
        const response = await fetch(`/trainee/${traineeId}`);
        const json = await response.json();
        if (response.ok) {
            setTrainee(json);
            setTraineeCourses(json.courses);
            setTraineeBalance(json.balance);
        }
    }

    const fetchInstructor = async (instID) => {
        const response = await fetch(`/instructor/${instID}`);
        const json = await response.json();
        if (response.ok) {
            setinstructorName(json.firstName + " " + json.lastName);
        }
    }

    const postRequest = async () => {
        const info = {traineeId,requestType,traineeComment,courseId}
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
            console.log("here",json);
            postComment(json);
        }
    }

    const postComment = async (reportId) => {
        const body = {traineeComment}
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
                <TextField  multiline rows={4} label="Enter Your Comment/Reasoning" sx={{minWidth:300,minHeight:100}}  type="text" value= {traineeComment} onChange={(e)=>setTraineeComment(e.target.value)} />
                </Box>
                <button type="submit">Submit</button>
            </form>

            <p><strong>{html}</strong></p>
        </div>
    )
}

export default TraineeReport;