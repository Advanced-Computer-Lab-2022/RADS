// import axios from 'axios';
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Button } from "@mui/material";


const TraineeForm = (props) => {
  const { rateVal, currencyVal } = props;
  const params = new URLSearchParams(window.location.search);
  const traineeId = params.get("traineeId");
  const [courses, setCourses] = useState([]);
  const [coursesIds, setCoursesIds] = useState([]);
  const todayDate = new Date();
  const [trainee,setTrainee] = useState([]);

  useEffect(() => {
    const viewRegistered = async () => {
      axios
      .get(`/trainee/${traineeId}`)
      .then((res) => {
        fetchCourses(res.data.courses);
        console.log(res.data.courses);
        setCoursesIds(res.data.courses);
        setTrainee(res.data);
      })
      .catch((error) => {
          console.error(error)
      })   
    
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

  const courseView1 = "/traineecourse?courseId=";
  const courseView2 = "&traineeId=";

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
          {courses &&
            courses.map((course) => (
              <box key={course._id}>
                <CourseCard
                  course={course}
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  todayDate={todayDate}
                  courseView1={courseView1}
                  courseView2={courseView2}
                  id={traineeId}
                />
                <Button
          variant="contained"
                  onClick={() =>
                    (window.location.href = `/traineereport?courseId=${course._id}&traineeId=${traineeId}`)
                  }
                >
                  Report Course
                </Button>
              </box>
            ))}
        </box>
      )}
      <Button
          variant="contained"
        onClick={() =>
          (window.location.href = `/traineeviewreports?traineeId=${traineeId}`)
        }
      >
        View Reports
      </Button>
    </box>
  );
};

export default TraineeForm;
