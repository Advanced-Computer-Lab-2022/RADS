// import axios from 'axios';
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Box } from "@mui/material";

const CourseView = (props) => {
  const { rateVal, currencyVal } = props;
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("courseId");
  const [course, setCourse] = useState([]);
  const [instructorName, setinstructorName] = useState([]);

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
  );
};

export default CourseView;
