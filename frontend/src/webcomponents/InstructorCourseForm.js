// import axios from 'axios';
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Box, Button } from "@mui/material";

const InstructorCourseForm = (props) => {
  const { rateVal, currencyVal } = props;
  const params = new URLSearchParams(window.location.search);
  const instruId = params.get("instructorId");
  const [courses, setCourses] = useState([]);
  const [coursesIds, setCoursesIds] = useState([]);
  const todayDate = new Date();
  const [trainee, setTrainee] = useState([]);
    const [instructorName, setinstructorName] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`/course/find/${instruId}`);
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        setCourses(json);
        fetchInstructor();
      }
    };
    fetchCourses();
  }, []);

  const fetchInstructor = async () => {
    axios
      .get(`/instructor/${instruId}`)
      .then((res) => {
        setinstructorName(res.data.firstName + " " + res.data.lastName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const courseView1 = "/InstructorView?courseId=";
  const courseView2 = "&instructorId=";

  return (
    <box>
      {courses.length === 0 ? (
        <p>
          <strong>
            <bold>{`You have not registered in any Course.`}</bold>
          </strong>
        </p>
      ) : (
        <box>
            <strong>Your Courses</strong>
          {courses &&
            courses.map((course) => (
              <Box>
                <CourseCard
                  course={course}
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  todayDate={todayDate}
                  courseView1={courseView1}
                  courseView2={courseView2}
                  id={instruId}
                />
              </Box>
            ))}
        </box>
      )}
    </box>
  );
};

export default InstructorCourseForm;
