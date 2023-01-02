import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Box, Button } from "@mui/material";

const CorpTraineeForm = (props) => {
  const { rateVal, currencyVal } = props;
  const params = new URLSearchParams(window.location.search);
  const corpTraineeId = params.get("corptraineeId");
  const [courses, setCourses] = useState([]);
  const [coursesIds, setCoursesIds] = useState([]);
  const todayDate = new Date();

  useEffect(() => {
    const viewRegistered = async () => {
      console.log(corpTraineeId);
      axios
        .get(`/corptrainee/${corpTraineeId}`)
        .then((res) => {
          fetchCourses(res.data.courses);
          setCoursesIds(res.data.courses);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    viewRegistered();
  }, []);

  const fetchCourses = async (ids) => {
    let courseIds = { ids };
    const response = await fetch(`/course/subset`, {
      method: "POST",
      body: JSON.stringify(courseIds),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      setCourses(json);
    }
  };

  const courseView1 = "/corptraineecourse?courseId=";
  const courseView2 = "&corpTraineeId=";

  return (
    <box>
      {courses.length === 0 ? (
        <p>
          <strong>
            <bold>{`You dont have access to any Course.`}</bold>
          </strong>
        </p>
      ) : (
        <box className="card-container">
          {courses &&
            courses.map((course) => (
              <Box>
                <box key={course._id}>
                  <CourseCard
                    course={course}
                    rateVal={rateVal}
                    currencyVal={currencyVal}
                    todayDate={todayDate}
                    courseView1={courseView1}
                    courseView2={courseView2}
                    id={corpTraineeId}
                  />
                </box>
                <Button
                  variant="contained"
                  onClick={() =>
                    (window.location.href = `/corptraineereport?courseId=${course._id}&corptraineeId=${corpTraineeId}`)
                  }
                >
                  Report Course
                </Button>
              </Box>
            ))}
        </box>
      )}
    </box>
  );
};

export default CorpTraineeForm;
