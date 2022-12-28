import * as React from "react";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import CourseCard from "./CourseCard";
import jwt_decode from "jwt-decode";
import axios from "axios";

const ratingMarks = [
  {
    value: -0.5,
    label: "StartStart",
  },
  {
    value: 0,
    label: "0",
  },
  {
    value: 0.5,
    label: "0.5",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 1.5,
    label: "1.5",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 2.5,
    label: "2.5",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 3.5,
    label: "3.5",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 4.5,
    label: "4.5",
  },
  {
    value: 5,
    label: "5",
  },
];

function valueStar(value) {
  return `${value}`;
}

const CorpTraineeSearch = (props) => {
  const {
    rateVal,
    currencyVal,
    token
  } = props;
  const decode = jwt_decode(token);
  const corpTraineeId = decode.id;
  const [queryS, setQueryS] = useState("");
  const [queryF2, setQueryF2] = useState("");
  const [queryF3, setQueryF3] = useState("");
  const [courses, setCourses] = useState([]);
  const keys = ["courseTitle", "subject", "instructor"];
  const newKeys = ["subject"];
  const [checkedSubjects, setCheckedSubjects] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [corpTraineeName, setCorpTraineeName] = useState("");
  const todayDate = new Date();
  const [highestViewedCourses, setHighestViewedCourses] = useState([]);

  // To fetch all the courses and put the results in courses
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/course");
      const json = await response.json();
      if (response.ok) {
        setCourses(json);
        getCourseSubjects();
        fetchCorpTrainee();
        getMostViewed();
      }
    };
    fetchCourses();
  }, []);

  const fetchCorpTrainee = async () => {
    axios
    .get(`/corptrainee/${corpTraineeId}`)
    .then((res) => {
      let x = res.data.firstName + " " + res.data.lastName;
      setCorpTraineeName(x);
    })
    .catch((error) => {
        console.error(error)
    })
  };
  //GET all course subjects
  const getCourseSubjects = async() =>{
    const response = await fetch("/course/get/coursesubjects");
    const json = await response.json();
    if (response.ok) {
      setCourseSubjects(json);
    }
  }

  const getMostViewed = async () => {
    const response = await fetch("/course/highest/views");
    const json = await response.json();
    if (response.ok) {
      setHighestViewedCourses(json);
    }
  };

  // to Perform the intersection between the search elements and filter elements

  const performIntersection = (arr1, arr2, arr3) => {
    const intersectionResult1 = arr1.filter((x) => arr2.indexOf(x) !== -1);
    const intersectionResult2 = intersectionResult1.filter(
      (x) => arr3.indexOf(x) !== -1
    );
    if (arr3.length === 0) {
      return intersectionResult1;
    } else {
      return intersectionResult2;
    }
  };

  // Search method
  const searchMethod = (courseData) => {
    return courseData.filter((item) =>
      keys.some((key) =>
        item[key]
          .toString()
          .toLowerCase()
          .includes(queryS.toString().toLowerCase())
      )
    );
  };

  // Rating filter method
  const filterMethodOnRating = (courseData) => {
    console.log(queryF3);
    if (!queryF3 || queryF3 === 5) {
      return courseData;
    } else {
      //console.log("here",queryF3 - 3);
      return courseData.filter((item) => item.courseRating <= queryF3);
    }
  };

  // Subject filter
  const filterMethodOnSubject = (event) => {
    var updatedSubList = [...checkedSubjects];
    let subjects = courses.filter((item) =>
      newKeys.some((key) =>
        item[key]
          .toString()
          .toLowerCase()
          .includes(event.target.value.toString().toLowerCase())
      )
    );
    if (event.target.checked) {
      updatedSubList = [...checkedSubjects].concat(subjects);
    } else {
      console.log(updatedSubList.length);
      for (let i = 0; i < updatedSubList.length; i++) {
        if (updatedSubList[i]["subject"] === event.target.value) {
          console.log(updatedSubList[i]["subject"] + " at " + i);
          updatedSubList.splice(i, 1);
          i--;
        }
      }
    }
    setCheckedSubjects(updatedSubList);
  };

  const courseView1 = "/corptraineeview?courseId=";
  const courseView2 = "&corpTraineeId=";

  return (
    <box>
      <p>
        <strong>Welcome {corpTraineeName}</strong>
      </p>
      <box className="homesearch-component">
        <input
          type="text"
          placeholder="Search Course..."
          className="search"
          onChange={(e) => setQueryS(e.target.value)}
        />

        <box className="highestviewed-courses ">
          <p className="highview-p">
            <strong>Highest Viewed Courses</strong>
          </p>
          <box className="card-container">
            {highestViewedCourses.map((course) => (
              <box>
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
            ))}
          </box>
        </box>
        <br />

        <button
          onClick={() =>
            (window.location.href = `/corptraineeform?corpTraineeId=${corpTraineeId}`)
          }
        >
          View my Courses
        </button>
        <box className="filter-component1">
          <box className="list-container">
            {courseSubjects.map((course) => (
              <box>
                <input
                  value={course}
                  name={course}
                  type="checkbox"
                  onChange={(e) => {
                    filterMethodOnSubject(e);
                  }}
                />
                <span>{course}</span>
                {/* <span className= {isChecked(course)}>{course.subject}</span> */}
              </box>
            ))}
          </box>
        </box>
        <box>{/* {`Subjects checked are: ${checkedItems}`} */}</box>
        <box className="homefilter-component3">
          <p>
            <strong>Rating Filter</strong>
          </p>
          <Box sx={{ width: 950 }}>
            <Slider
              className="rating-slider"
              aria-label="Always visible"
              getAriaValueText={valueStar}
              defaultValue={5}
              marks={ratingMarks}
              valueLabelDisplay="on"
              size="small"
              max={5}
              step={0.1}
              min={0}
              name="Rating-filter"
              onChangeCommitted={(e, v) => {
                setQueryF3(v);
              }}
            />
          </Box>
        </box>
        <box className="home-search card-container">
          {performIntersection(
            searchMethod(courses),
            filterMethodOnRating(courses),
            checkedSubjects
          ) &&
            performIntersection(
              searchMethod(courses),
              filterMethodOnRating(courses),
              checkedSubjects
            ).map((course) => (
              <box>
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
            ))}
        </box>
      </box>
    </box>
  );
};

export default CorpTraineeSearch;
