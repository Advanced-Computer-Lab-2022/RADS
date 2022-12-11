// import axios from 'axios';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
//import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const CorpTraineeSolve = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const corptraineeId = params.get('corptraineeId');
    const courseId = params.get('courseId');
    const corpTraineeId = null;
    const [course, setCourse] = useState([]);
    const [corptrainee,setCorpTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState([]);
    const [instructorId, setInstructorId] = useState('');

    useEffect(() => {
        const fetchCourse = async() => {
            const response = await fetch(`/course/${courseId}`);
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                setCourse(json);
                fetchInstructor(json.instructor);
                fetchCorpTrainee();
                setInstructorId(json.instructor);
            }
        }
        fetchCourse();
    }, [])

    const fetchInstructor = async(instID) => {
        const response = await fetch(`/instructor/${instID}`);
        const json = await response.json();
        if (response.ok) {
            setinstructorName(json.firstName + " " + json.lastName);
        }
    }
    const fetchCorpTrainee = async() => {
        const response = await fetch(`/corptrainee/${corptraineeId}`);
        const json = await response.json();
        if (response.ok) {
            setCorpTrainee(json);
        }
    }

    return (
        <div>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>

            {courses && courses.map((course)=>(
          <div key = {course._id}>
          <h4>The information of course: {course.courseTitle} </h4>
          <div><strong>Course Subtitles: </strong> {course.subtitles && course.subtitles.map((subtitle)=>(
                <div>
                <p>{subtitle.subTitle}</p>
                <p>Description:{subtitle.description}</p>
                <p>Total Hours of the Chapter: {subtitle.hours}</p>
                <iframe width="600" height="315" title="Video Summary" src={subtitle.videoLink} frameBorder="0" allowFullScreen></iframe> 
                </div>
             ))}</div>
            <p><strong>Price: </strong>{course.price*rateVal}{" "}{currencyVal}</p>
            <p><strong>Short Summary about the Course: </strong>{course.shortSummary}</p>
            <p><strong>Subject of the course: </strong>{course.subject}</p>
            <button onClick={() => window.location.href=`/corptraineerate?corptraineeId=${corptraineeId}&courseId=${course._id}`}>Rate Course</button>
            <button onClick={() => window.location.href=`/corptraineesolve?corptraineeId=${corptraineeId}&courseId=${course._id}`}>Solve Exercises</button>
            <p><strong>============================================================================================================</strong></p>
                </div>
             ))}
        </div>
    )
}


export default CorpTraineeSolve;