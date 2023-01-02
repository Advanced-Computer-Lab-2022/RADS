// import axios from 'axios';
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Box, Button } from "@mui/material";
import jwt_decode from "jwt-decode";
const CourseView = (props) => {
  const { rateVal, currencyVal, user, token } = props;
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("courseId");
  const [course, setCourse] = useState([]);
  const [instructorName, setinstructorName] = useState([]);
  var instruId = 0;
  const decode = jwt_decode(token);
  instruId = decode.id;

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/course/${courseId}`);
      const json = await response.json();
      if (response.ok) {
        setCourse(json);
        fetchInstructor(json.instructor);
        incrementViews();
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

  const incrementViews = async () => {
    const response = await fetch(`/course/updateviews/${courseId}`, {
      method: "PATCH",
      body: JSON.stringify({}),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("error happened:", json.error);
    }
    if (response.ok) {
      console.log("course view incremented", json);
      //refresh page on successful submission
    }
  };

  return (
    <Box>
      {user.isconnected && (user.role === "INSTRUCTOR") ? (
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
          </Box>) : (
      <Box>
        <h4>The information of course: {course.courseTitle} </h4>
        <ReactPlayer
          sandbox="allow-presentation"
          loop={false}
          className="react-player"
          url={course.coursePreview}
          width="20%"
          height="100%"
          controls={true}
        />
        <Box>
          <strong>Course Subtitles: </strong>{" "}
          {course.subtitles &&
            course.subtitles.map((subtitle) => (
              <Box>
                <p>{subtitle.subTitle}</p>
                <p>Description:{subtitle.description}</p>
                <p>Total Hours of the Chapter: {subtitle.hours}</p>
              </Box>
            ))}
        </Box>
        <p>
          <strong>Price: </strong>
          {Math.ceil(course.price * rateVal)} {currencyVal}
        </p>
        <p>
          <strong>Instructor of the course: </strong>
          {instructorName}
        </p>
        <p>
          <strong>Total Hours of the course: </strong>
          {course.totalHours} Hours
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
        <p>
          <strong>
            ============================================================================================================
          </strong>
        </p>
      </Box>
          )}
    </Box>
  );
};

export default CourseView;
