import * as React from "react";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import CourseCard from "./CourseCard";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputLabel } from "@mui/material";

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

function valueDollar(value, currencyVal) {
  return `${value} ${currencyVal}`;
}
const HomeSearch = (props) => {
  const [queryS, setQueryS] = useState("");
  const [queryF2, setQueryF2] = useState("");
  const [queryF3, setQueryF3] = useState("");
  const [courses, setCourses] = useState([]);
  const [highestViewedCourses, setHighestViewedCourses] = useState([]);
  const keys = ["courseTitle", "subject", "instructorName"];
  const newKeys = ["subject"];
  const [checkedSubjects, setCheckedSubjects] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(0);
  const { rateVal, currencyVal } = props;
  const todayDate = new Date();

  // To fetch all the courses and put the results in courses
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/course");
      const json = await response.json();
      if (response.ok) {
        setCourses(json);
        getCourseSubjects();
        findMaxPrice();
        getMostViewed();
      }
    };
    fetchCourses();
  }, []);

  const findMaxPrice = async () => {
    const response = await fetch("/course/max", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setMaxPrice(json);
      setError(null);
      console.log("max price added", json);
    }
  };

  const getMostViewed = async () => {
    const response = await fetch("/course/highest/views");
    const json = await response.json();
    if (response.ok) {
      setHighestViewedCourses(json);
    }
  };

  const getCourseSubjects = async () => {
    const response = await fetch("/course/get/coursesubjects");
    const json = await response.json();
    if (response.ok) {
      setCourseSubjects(json);
    }
  };

  // to Perform the intersection between the search elements and filter elements

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

  const courseView1 = "/filter?courseId=";
  const courseView2 = "";

  return (
    <Box>
      <Box className="homesearch-component">
        <Box className="search">
          <TextField
            hiddenLabel
            id="filled-search"
            type="search"
            size="small"
            variant="filled"
            onChange={(e) => setQueryS(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ marginRight: 2 }} />,
            }}
          />
        </Box>

        <Box className="highestviewed-courses card-container">
          <Box className="highview-p">
            <strong>Highest Viewed Courses</strong>
          </Box>
          <Box className="card-container">
            {highestViewedCourses.map((course) => (
              <Box>
                <CourseCard
                  course={course}
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  todayDate={todayDate}
                  courseView1={courseView1}
                  courseView2={courseView2}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <br />
        <Box className="filter-component1">
          <Box className="list-container">
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
        <Box className="homefilter-component3">
          <p>
            <strong>Rating Filter</strong>
          </p>
          <Box className="list-container">
            {ratingMarks.map((mark,index) => (
              <Box className="rate-box">
                <input             
                  value={mark.value}
                  name={mark.label}
                  className = 'rate-input'
                  checked={queryF3.toString().toLowerCase() === mark.value.toString().toLowerCase() || (!queryF3 && index === 0)}
                  type="radio"
                  onChange={(e) => {setQueryF3(e.target.value)}}
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

        <Box className="home-search card-container">
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
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeSearch;
