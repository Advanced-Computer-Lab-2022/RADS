import * as React from 'react';
import { useEffect, useState } from "react"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';



const ratingMarks = [
  {
    value: -0.5,
    label: 'StartStart',
  },
  {
    value: 0,
    label: '0',
  },
  {
    value: 0.5,
    label: '0.5',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 1.5,
    label: '1.5',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 2.5,
    label: '2.5',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 3.5,
    label: '3.5',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 4.5,
    label: '4.5',
  },
  {
    value: 5,
    label: '5',
  }
];


function valueStar(value) {
  return `${value}`;
}

const CorpTraineeSearch = (props) => {
  const corpTraineeId = '639c996288853b0c6ec77018';
  const [queryS, setQueryS] = useState("");
  const [queryF2, setQueryF2] = useState("");
  const [queryF3, setQueryF3] = useState("");
  const [courses, setCourses] = useState([]);
  const keys = ["courseTitle", "subject", "instructor"];
  const newKeys = ["subject"];
  const [checkedSubjects, setCheckedSubjects] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [corpTraineeName, setCorpTraineeName] = useState('');
  const {
    rateVal,
    currencyVal
  } = props;
  const todayDate = new Date();
  const [highestViewedCourses, setHighestViewedCourses] = useState([]);


  // To fetch all the courses and put the results in courses
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/course');
      const json = await response.json();
      if (response.ok) {
        setCourses(json);
        setCourseSubjects(getCourseSubjects(json));
        fetchCorpTrainee();
        getMostViewed();
      }
    }
    fetchCourses();
  }, [])


  const fetchCorpTrainee = async () => {
    const response = await fetch(`/corptrainee/${corpTraineeId}`);
    const json = await response.json();
    if (response.ok) {
      let x = json.firstName + " " + json.lastName;
      setCorpTraineeName(x);
    }
  }
  //GET all course subjects
  const getCourseSubjects = (arr) => {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (!newArray.includes(arr[i].subject)) {
        newArray[i] = arr[i].subject;
      }
    }
    return newArray;
  }

  const getMostViewed = async () => {
    const response = await fetch('/course/highest/views');
    const json = await response.json();
    if (response.ok) {
      setHighestViewedCourses(json);
    }
  }

  // to Perform the intersection between the search elements and filter elements

  const performIntersection = (arr1, arr2, arr3) => {
    const intersectionResult1 = arr1.filter(x => arr2.indexOf(x) !== -1);
    const intersectionResult2 = intersectionResult1.filter(x => arr3.indexOf(x) !== -1);
    if (arr3.length === 0) {
      return intersectionResult1;
    }
    else {
      return intersectionResult2;
    }

  }

  // Search method
  const searchMethod = (courseData) => {
    return courseData.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(queryS.toString().toLowerCase()))
    );
  }


  // Rating filter method
  const filterMethodOnRating = (courseData) => {
    console.log(queryF3);
    if ((!queryF3 || queryF3 === 5)) {
      return courseData;
    }
    else {
      //console.log("here",queryF3 - 3);
      return courseData.filter(item => item.courseRating <= queryF3);
    }
  }

  // Subject filter
  const filterMethodOnSubject = (event) => {
    var updatedSubList = [...checkedSubjects];
    let subjects = courses.filter((item) =>
      newKeys.some((key) => item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase())));
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



  return (
    <div>
      <p><strong>Welcome {corpTraineeName}</strong></p>
      <div className='homesearch-component'>
        <input type='text' placeholder='Search Course...' className='search' onChange={e => setQueryS(e.target.value)} />

        <div className='highestviewed-courses'>
          <p className='highview-p'><strong>Highest Viewed Courses</strong></p>
          {highestViewedCourses.map((course) => (
            <div>
              <Link onClick={() => window.location.href = `/corptraineeview?courseId=${course._id}&corpTraineeId=${corpTraineeId}`} key={course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5</Link>
            </div>
          ))}
        </div>
        <br />

        <button onClick={() => window.location.href = `/corptraineeform?corpTraineeId=${corpTraineeId}`}>View my Courses</button>
        <div className='filter-component1'>
          <div className="list-container">
            {courseSubjects.map((course) => (
              <div>
                <input value={course} name={course} type="checkbox" onChange={e => { filterMethodOnSubject(e) }} />
                <span>{course}</span>
                {/* <span className= {isChecked(course)}>{course.subject}</span> */}
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* {`Subjects checked are: ${checkedItems}`} */}
        </div>
        <div className='homefilter-component3'>
          <p><strong>Rating Filter</strong></p>
          <Box sx={{ width: 950 }}>
            <Slider className='rating-slider' aria-label="Always visible" getAriaValueText={valueStar} defaultValue={5} marks={ratingMarks} valueLabelDisplay="on" size="small" max={5} step={0.1} min={0} name='Rating-filter' onChangeCommitted={(e, v) => { setQueryF3(v) }} />
          </Box>
        </div>
        <div className="home-search">
          {performIntersection(searchMethod(courses), filterMethodOnRating(courses), checkedSubjects) && performIntersection(searchMethod(courses), filterMethodOnRating(courses), checkedSubjects).map((course) => (
            <div>
              <Link onClick={() => window.location.href = `/corptraineeview?courseId=${course._id}&corpTraineeId=${corpTraineeId}`} key={course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )


}

export default CorpTraineeSearch;