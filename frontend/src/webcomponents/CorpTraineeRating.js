// import axios from 'axios';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
//import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Button } from '@mui/material';
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

const CorpTraineeRating = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const corpTraineeId = params.get('corpTraineeId');
    const courseId = params.get('courseId');
    const traineeId = null;
    const [course, setCourse] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [cReview, setCReview] = useState('');
    const [cRating, setCRating] = useState(0);
    const [iReview, setIReview] = useState('');
    const [iRating, setIRating] = useState(0);
    const [instructorName, setinstructorName] = useState([]);
    const [instructorId, setInstructorId] = useState('');
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);
    const [html1, setHtml1] = useState("");
    const [html2, setHtml2] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
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


    const submitReviewInstructor = async (e) => {
        e.preventDefault()
        const review = { iRating, iReview, traineeId, corpTraineeId };
        axios
        .post(`/instructor/review/${instructorId}`, review)
        .then((res) => {
            setIReview('');
            setIRating(0);
            console.log("New review Added for Instructor", res.data);
            //refresh page on successful submission
            setHtml1("Instructor rating & review Added Successfully");
        })
        .catch((error) => {
            console.error(error)
        })
    }
    const submitReviewCourse = async (e) => {
        e.preventDefault()
        const review = { cRating, cReview, traineeId, corpTraineeId };
        const response = await fetch(`/course/review/${courseId}`, {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (!response.ok) {
            setError2(json.error);
        }
        if (response.ok) {
            setCReview('');
            setCRating(0);
            console.log("New review Added for Course ", json);
            //refresh page on successful submission
            setHtml2("Course rating & review Added Successfully");
        }
    }


    return (
        <Box>
            <Box key={course._id}>
                <h4>Course: {course.courseTitle} </h4>
                <p><strong>Rating of the course: </strong>{course.courseRating} Out of 5</p>
                <form className='rating-instructor' onSubmit={submitReviewInstructor}>
                    <label>Enter your rating on instructor: {instructorName}</label>

                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Typography component="legend">Instructor Rating</Typography>
                        <Rating
                            name="simple-controlled"
                            value={iRating}
                            onChange={(event, newValue) => {
                                if (newValue === null) {
                                    newValue = 0;
                                }
                                console.log("rating:", newValue);
                                setIRating(newValue);
                            }}
                        />
                    </Box>
                    <label>Enter a review on instructor: {instructorName}</label>
                    <input type="text" onChange={(e) => setIReview(e.target.value)} value={iReview}></input>
                    <Button
          variant="contained">Submit</Button>
                </form>
                <p><strong>{html1}</strong></p>
                <form className='rating-course' onSubmit={submitReviewCourse}>
                    <label>Enter a rating on the course:</label>

                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Typography component="legend">Course Rating</Typography>
                        <Rating
                            name="simple-controlled"
                            value={cRating}
                            onChange={(event, newValue) => {
                                if (newValue === null) {
                                    newValue = 0;
                                }
                                setCRating(newValue);
                            }}
                        />


                    </Box>
                    <label>Enter a review on the course:</label>
                    <input type="text" onChange={(e) => setCReview(e.target.value)} value={cReview}></input>
                    <Button
          variant="contained">Submit</Button>
                </form>
                <p><strong>{html2}</strong></p>
            </Box>
        </Box>
    )
}


export default CorpTraineeRating;