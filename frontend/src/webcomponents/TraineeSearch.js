import * as React from 'react';
import { useEffect, useState } from "react"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';



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
}


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

function valueDollar(value, currencyVal) {
  return `${value} ${currencyVal}`;
}
const TraineeSearch = (props) => {
  const traineeId = '6395b442bd29cab07c63afa5';
  const [queryS, setQueryS] = useState("");
  const [queryF2, setQueryF2] = useState("");
  const [queryF3, setQueryF3] = useState("");
  const [courses, setCourses] = useState([]);
  const keys = ["courseTitle", "subject", "instructor"];
  const newKeys = ["subject"];
  const [checkedSubjects, setCheckedSubjects] = useState([]);
  const [highestViewedCourses, setHighestViewedCourses] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [traineeName, setTraineeName] = useState('');
  const todayDate = new Date();
  const {
    rateVal,
    currencyVal
  } = props;


  // To fetch all the courses and put the results in courses
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/course');
      const json = await response.json();
      if (response.ok) {
        setCourses(json);
        setCourseSubjects(getCourseSubjects(json));
        fetchTrainee();
        getMostViewed();
      }
    }
    fetchCourses();
  }, [])

  const getMostViewed = async () => {
    const response = await fetch('/course/highest/views');
    const json = await response.json();
    if (response.ok) {
      setHighestViewedCourses(json);
    }
  }



  const fetchTrainee = async () => {
    const response = await fetch(`/trainee/${traineeId}`);
    const json = await response.json();
    if (response.ok) {
      let x = json.firstName + " " + json.lastName;
      setTraineeName(x);
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


  // to Perform the intersection between the search elements and filter elements

  const performIntersection = (arr1, arr2, arr3, arr4) => {
    const intersectionResult1 = arr1.filter(x => arr2.indexOf(x) !== -1);
    const intersectionResult2 = intersectionResult1.filter(x => arr3.indexOf(x) !== -1);
    const intersectionResult3 = intersectionResult2.filter(x => arr4.indexOf(x) !== -1);
    if (arr4.length === 0) {
      return intersectionResult2;
    }
    else {
      return intersectionResult3;
    }

  }

  // Search method
  const searchMethod = (courseData) => {
    return courseData.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(queryS.toString().toLowerCase()))
    );
  }
  // Price filter method
  const filterMethodOnPrice = (courseData) => {
    if ((!queryF2 || queryF2 === Math.ceil(7000 * rateVal))) {
      return courseData;
    }
    else {
      return courseData.filter(item => Math.ceil(item.price * rateVal) <= queryF2);
    }
  }

  // Rating filter method
  const filterMethodOnRating = (courseData) => {
    console.log(queryF3);
    if ((!queryF3 || queryF3 === -0.5) && queryF3 !== 0) {
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
      <p><strong>Welcome {traineeName}</strong></p>
      <div className='homesearch-component'>
        <input type='text' placeholder='Search Course...' className='search' onChange={e => setQueryS(e.target.value)} />

        <div className='highestviewed-courses'>
          <p className='highview-p'><strong>Highest Viewed Courses</strong></p>
          {highestViewedCourses.map((course) => (
            <div>
              <Link onClick={() => window.location.href = `/filter?courseId=${course._id}`} key={course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5 | Price = {Math.ceil(course.price * rateVal)} {' '} {currencyVal} |    {course.promotionEndDate && new Date(course.promotionEndDate) >= todayDate ? (<p>Promotion: {course.promotionRate} off</p>) : (<p>no promo</p>)}</Link>
            </div>
          ))}
        </div>
        <br />

        <button onClick={() => window.location.href = `/traineeform?traineeId=${traineeId}`}>View my Courses</button>
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

        <div className='filter-component2'>
          <p><strong>Price Filter</strong></p>
          <Box className='price-box' sx={{ width: 430 }}>
            <Slider className='price-slider' aria-label="Always visible" getAriaValueText={valueDollar} defaultValue={Math.ceil(7000 * rateVal)} marks={setRate(rateVal)} valueLabelDisplay="on" size="small" max={Math.ceil(7000 * rateVal)} step={Math.ceil(1 * rateVal)} min={Math.ceil(0 * rateVal)} name='Price-filter' onChangeCommitted={(e, v) => { setQueryF2(v) }} />
          </Box>
        </div>
        <div className='homefilter-component3'>
          <p><strong>Rating Filter</strong></p>
          <Box className='rating-box' sx={{ width: 430 }}>
            <Slider className='rating-slider' aria-label="Always visible" getAriaValueText={valueStar} marks={ratingMarks} valueLabelDisplay="on" size="small" max={5} step={0.1} min={-0.1} name='Rating-filter' onChangeCommitted={(e, v) => { setQueryF3(v) }} />
          </Box>
        </div>
        <div className="home-search">
          {performIntersection(filterMethodOnPrice(courses), searchMethod(courses), filterMethodOnRating(courses), checkedSubjects) && performIntersection(filterMethodOnPrice(courses), searchMethod(courses), filterMethodOnRating(courses), checkedSubjects).map((course) => (
            <div>
              <Link onClick={() => window.location.href = `/traineeview?courseId=${course._id}&traineeId=${traineeId}`} key={course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5 | Price = {Math.ceil(course.price * rateVal)} {' '} {currencyVal}</Link>
            </div>
          ))}
        </div>
        {/* <div>
              <Link onClick={() => window.location.href=`/instructorlobby`}>here</Link>
              </div>  */}
      </div>
    </div>
  )


}

export default TraineeSearch;