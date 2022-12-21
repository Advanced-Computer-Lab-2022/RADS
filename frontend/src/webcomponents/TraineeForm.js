// import axios from 'axios';
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

const TraineeForm = (props) => {
  const { rateVal, currencyVal } = props;
  const params = new URLSearchParams(window.location.search);
  const traineeId = params.get("traineeId");
  const [courses, setCourses] = useState([]);
  const [coursesIds, setCoursesIds] = useState([]);
  const todayDate = new Date();

  useEffect(() => {
    const viewRegistered = async () => {
      const response = await fetch(`/trainee/${traineeId}`);
      const json = await response.json();
      console.log(json.courses);
      if (response.ok) {
        fetchCourses(json.courses);
        console.log(json.courses);
        setCoursesIds(json.courses);
      }
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
              </box>
            ))}
        </box>
      )}
    </box>
  );
};

export default TraineeForm;
