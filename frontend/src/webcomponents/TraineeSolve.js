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

const TraineeSolve = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const traineeId = params.get('traineeId');
    const courseId = params.get('courseId');
    const corpTraineeId = null;
    const [course, setCourse] = useState([]);
    const [trainee, setTrainee] = useState([]);
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
                fetchTrainee();
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
    const fetchTrainee = async() => {
        const response = await fetch(`/trainee/${traineeId}`);
        const json = await response.json();
        if (response.ok) {
            setTrainee(json);
        }
    }

    return (
        <div>
            
        </div>
    )
}


export default TraineeSolve;