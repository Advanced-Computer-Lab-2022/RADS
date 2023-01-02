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
import { Button } from "@mui/material";

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

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [promotionStartDate, setPromotionStartDate] = useState("");
  const [promotionEndDate, setPromotionEndDate] = useState("");
  const [promotionRate, setPromotionRate] = useState("");
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
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
  }
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

  const handleChange = (e) => {
    setSelectedCourseId(e.target.value);
    console.log(e.target.value);
  };
  const HandleStartDate = (e) => {
    setPromotionStartDate(e.target.value);
  };
  const HandleEndDate = (e) => {
    setPromotionEndDate(e.target.value);
  };
  const HandlePromotionVal = (e) => {
    console.log(e.target.value);
    setPromotionRate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    const promo = { promotionStartDate, promotionEndDate, promotionRate };
    console.log(promo);
    const response = await fetch(`/course/promo/${selectedCourseId}`, {
      method: "POST",
      body: JSON.stringify(promo),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setSelectedCourseId("");
      setPromotionStartDate("");
      setPromotionEndDate("");
      setPromotionRate("");
      setText("Promotion inserted !");
      setError(null);
      console.log("New promotion Added", json);
    }
  };

  const courseView1 = "/filter?courseId=";
  const courseView2 = "";

  return (
    <box>
      <box className="instructor-promotion">
        <p>
          <strong>Enter a promotion for a course:</strong>
        </p>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: 300 }} className="create-promotion">
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCourseId}
              label="Course"
              onChange={handleChange}
            >
              {courses.map((course) => (
                <MenuItem value={course._id}> {course.courseTitle}</MenuItem>
              ))}
            </Select>
            <label>Starting Date</label>
            <input
              type="date"
              value={promotionStartDate}
              onChange={HandleStartDate}
            />
            <label>Ending Date</label>
            <input
              type="date"
              value={promotionEndDate}
              onChange={HandleEndDate}
            />
            <label>Promotion Precentage:</label>
            <input
              type="range"
              value={promotionRate}
              onChange={HandlePromotionVal}
            />
            <p>Value: {promotionRate}</p>
            <Button type='submit' variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
          <p>
            <strong>{text}</strong>
          </p>
        </Box>
      </box>
      <box className="instructor-welcome">
        <p>
          Welcome, <strong>{instructorName}</strong>
        </p>
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
      </box>
      <box className="search-component">
        <input
          type="text"
          placeholder="Search Course..."
          className="search"
          onChange={(e) => setQueryS(e.target.value)}
        />
      </box>

      <box className="highestviewed-courses">
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
              />
            </box>
          ))}
        </box>
      </box>
      <br />

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
      <box className="filter-component2">
        <br></br>
        <br></br>
        <p>
          <strong>Price Filter</strong>
        </p>
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
      </box>

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
          <box className={course._id}>
            <h4>The information of course: {course.courseTitle} </h4>
            <box>
              <strong>Course Subtitles: </strong>{" "}
              {course.subtitles &&
                course.subtitles.map((subtitle) => (
                  <box>
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
                  </box>
                ))}
            </box>
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
            <box>
              <strong>Course Exercises: </strong>{" "}
              {course.courseExercises &&
                course.courseExercises.map((exercise) => (
                  <box>
                    <p>Question: {exercise.question}</p>
                  </box>
                ))}
            </box>
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
          </box>
        ))}
      <Button
        variant="contained"
        onClick={() =>
          (window.location.href = `/instructorviewreports?instructorId=${instruId}`)
        }
      >
        View Reports
      </Button>
    </box>
  );
};

export default SearchCourse;
