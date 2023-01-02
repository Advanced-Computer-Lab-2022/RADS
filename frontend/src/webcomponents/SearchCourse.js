import * as React from "react";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReactPlayer from "react-player";
import CourseCard from "./CourseCard";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import HighestViewedCourses from "./HighestViewedCourses";

const setRate = (val) => {
  const priceMarks = [
    {
      value: Math.ceil(0 * val),
      label: `0/FREE`,
    },
    {
      value: Math.ceil(1000 * val),
      label: `${Math.ceil(1000 * val)}`,
    },
    {
      value: Math.ceil(2000 * val),
      label: `${Math.ceil(2000 * val)}`,
    },
    {
      value: Math.ceil(3000 * val),
      label: `${Math.ceil(3000 * val)}`,
    },
    {
      value: Math.ceil(4000 * val),
      label: `${Math.ceil(4000 * val)}`,
    },
    {
      value: Math.ceil(5000 * val),
      label: `${Math.ceil(5000 * val)}`,
    },
    {
      value: Math.ceil(6000 * val),
      label: `${Math.ceil(6000 * val)}`,
    },
    {
      value: Math.ceil(7000 * val),
      label: `${Math.ceil(7000 * val)}`,
    },
  ];
  return priceMarks;
};

const ratingMarks = [
  {
    value: 0,
    label: "All Ratings",
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
];
function valueDollar(value) {
  return `${value}$`;
}

const SearchCourse = (props) => {
  const { rateVal, currencyVal, token } = props;

  //const params = new URLSearchParams(window.location.search);
  const decode = jwt_decode(token);
  const instruId = decode.id;
  const [queryS, setQueryS] = useState("");
  const [queryF2, setQueryF2] = useState("");
  const [queryF3, setQueryF3] = useState("");
  const [courses, setCourses] = useState([]);
  const [instructorName, setinstructorName] = useState("");
  const keys = ["courseTitle", "subject", "instructorName"];
  const newKeys = ["subject"];
  const [checkedSubjects, setCheckedSubjects] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState([]);

  const [error, setError] = useState(null);
  const todayDate = new Date();
  const [highestViewedCourses, setHighestViewedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`/course/find/${instruId}`);
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        setCourses(json);
        getCourseSubjects();
        getMostViewed();
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

  const getMostViewed = async () => {
    const response = await fetch("/course/highest/views");
    const json = await response.json();
    if (response.ok) {
      setHighestViewedCourses(json);
    }
  };

  //GET all course subjects taught by instructor
  const getCourseSubjects = async () => {
    const response = await fetch(
      `/course/getinstructor/coursesubjects/${instruId}`
    );
    const json = await response.json();
    if (response.ok) {
      setCourseSubjects(json);
    }
  };
  const performIntersection = (arr1, arr2, arr3, arr4) => {
    const intersectionResult1 = arr1.filter((x) => arr2.indexOf(x) !== -1);
    const intersectionResult2 = intersectionResult1.filter(
      (x) => arr3.indexOf(x) !== -1
    );
    const intersectionResult3 = intersectionResult2.filter(
      (x) => arr4.indexOf(x) !== -1
    );
    if (arr4.length === 0) {
      return intersectionResult2;
    } else {
      return intersectionResult3;
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
  // Price filter method
  const filterMethodOnPrice = (courseData) => {
    if (!queryF2 || queryF2 === Math.ceil(7000 * rateVal)) {
      return courseData;
    } else {
      return courseData.filter(
        (item) => Math.ceil(item.price * rateVal) <= queryF2
      );
    }
  };

  // Rating filter method
  const filterMethodOnRating = (courses) => {
    let ratings = courses.filter((item) => item.courseRating >= queryF3);
    return ratings;
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

  const courseView1 = "/InstructorView?courseId=";
  const courseView2 = "&instructorId=";

  ////////////////////////////  Accordion Functions  ////////////////////////////
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <Box>
      <Box className="instructor-welcome">
        <Box className="center">
          <p>
            Welcome, <strong>{instructorName}</strong>
          </p>
        </Box>
        <Box className="center">
          <Button
            variant="contained"
            onClick={() =>
              (window.location.href = `/instructorrating?instructorId=${instruId}`)
            }
          >
            View rating & reviews
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              (window.location.href = `/instructormonthly?instructorId=${instruId}`)
            }
          >
            View Monthly Earnings
          </Button>
        </Box>
      </Box>
      <Box className="search">
        <TextField
          hiddenLabel
          id="filled-search"
          type="search"
          size="small"
          variant="filled"
          placeholder="Search for courses"
          onChange={(e) => setQueryS(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ marginRight: 2 }} />,
          }}
        />
      </Box>

      <HighestViewedCourses
        highestViewedCourses={highestViewedCourses}
        rateVal={rateVal}
        currencyVal={currencyVal}
        todayDate={todayDate}
        courseView1={courseView1}
        courseView2={courseView2}
        id={instruId}
      />

      <br />

      <Box>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>
              <strong>Subject Filter</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box className="filter-component1">
                <Box className="card-container">
                  {courseSubjects.map((course) => (
                    <Box>
                      <input
                        value={course}
                        name={course}
                        type="checkbox"
                        onChange={(e) => {
                          filterMethodOnSubject(e);
                        }}
                      />
                      <span>{course}</span>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>
              <strong>Price Filter</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box className="filter-component2">
                <Box className="price-box" sx={{ width: 430 }}>
                  <Slider
                    className="price-slider"
                    aria-label="Always visible"
                    getAriaValueText={valueDollar}
                    defaultValue={Math.ceil(7000 * rateVal)}
                    marks={setRate(rateVal)}
                    valueLabelDisplay="on"
                    size="small"
                    max={Math.ceil(7000 * rateVal)}
                    step={Math.ceil(1 * rateVal)}
                    min={Math.ceil(0 * rateVal)}
                    name="Price-filter"
                    onChangeCommitted={(e, v) => {
                      setQueryF2(v);
                    }}
                  />
                </Box>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>
              <strong>Rating Filter</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Box className="homefilter-component3">
                <Box className="card-container">
                  {ratingMarks.map((mark, index) => (
                    <Box className="rate-box">
                      <input
                        value={mark.value}
                        name={mark.label}
                        className="rate-input"
                        checked={
                          queryF3.toString().toLowerCase() ===
                            mark.value.toString().toLowerCase() ||
                          (!queryF3 && index === 0)
                        }
                        type="radio"
                        onChange={(e) => {
                          setQueryF3(e.target.value);
                        }}
                      />
                      {mark.value === 0 ? (
                        <span>{mark.label}</span>
                      ) : (
                        <span>{mark.label} and Up</span>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <br />
      <Box className="card-container">
        {performIntersection(
          filterMethodOnPrice(courses),
          searchMethod(courses),
          filterMethodOnRating(courses),
          checkedSubjects
        ) &&
          performIntersection(
            filterMethodOnPrice(courses),
            searchMethod(courses),
            filterMethodOnRating(courses),
            checkedSubjects
          ).map((course) => (
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
      </Box>
      <Button
        variant="contained"
        onClick={() =>
          (window.location.href = `/instructorviewreports?instructorId=${instruId}`)
        }
      >
        View Reports
      </Button>
    </Box>
  );
};

export default SearchCourse;
