import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const InstructorView = (props) => {
        const params = new URLSearchParams(window.location.search);
        const courseId = params.get("courseId");
        const instruId = params.get("instructorId");
        const [course, setCourse] = useState([]);
        const [trainee, setTrainee] = useState([]);
        const [traineeCourses, setTraineeCourses] = useState([]);
        const [instructorName, setinstructorName] = useState([]);
        const [exists, setExists] = useState(false);
        const {rateVal, currencyVal} = props;
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
            }
          };
          fetchCourse();
        }, []);

        const fetchInstructor = async (instID) => {
          axios
            .get(`/instructor/${instID}`)
            .then((res) => {
              setinstructorName(res.data.firstName + " " + res.data.lastName);
            })
            .catch((error) => {
              console.error(error);
            });
        };

    return (
      <Box className={course._id}>
        <h4>The information of course: {course.courseTitle} </h4>
        <Box>
          <strong>Course Subtitles: </strong>{" "}
          {course.subtitles &&
            course.subtitles.map((subtitle) => (
              <Box>
                <p>{subtitle.subTitle}</p>
                <p>Description: {subtitle.description}</p>
                <p>Total Hours of the Chapter: {subtitle.hours}</p>
                <ReactPlayer
                  sandbox="allow-presentation"
                  loop={false}
                  className="react-player"
                  url={subtitle.videoLink}
                  width="20%"
                  height="100%"
                  controls={true}
                />
              </Box>
            ))}
        </Box>
        <p>
          <strong>Price: </strong>
          {course.price * rateVal} {currencyVal}
        </p>
        <p>
          <strong>Short Summary about the Course: </strong>
          {course.shortSummary}
        </p>
        <p>
          <strong>Subject of the course: </strong>
          {course.subject}
        </p>
        <p>
          <strong>Instructor of the course: </strong>
          {instructorName}
        </p>
        <p>
          <strong>Rating of the course: </strong>
          {course.courseRating} Out of 5
        </p>
        <Box>
          <strong>Course Exercises: </strong>{" "}
          {course.courseExercises &&
            course.courseExercises.map((exercise) => (
              <Box>
                <p>Question: {exercise.question}</p>
              </Box>
            ))}
        </Box>
        <Button
          variant="contained"
          onClick={() =>
            (window.location.href = `/instructorreport?courseId=${course._id}&instructorId=${instruId}`)
          }
        >
          Report Course
        </Button>
        <p>
          <strong>
            ============================================================================================================
          </strong>
        </p>
      </Box>
    );
}
 
export default InstructorView;