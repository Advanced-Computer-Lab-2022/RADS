import * as React from 'react';
import { useEffect,useState } from "react"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const priceMarks = [
    {
      value: -500,
      label: 'StartStart',
    },
    {
      value: 0,
      label: '0$',
    },
    {
      value: 1000,
      label: '1000$',
    },
    {
      value: 2000,
      label: '2000$',
    },
    {
      value: 3000,
      label: '3000$',
    },
    {
      value: 4000,
      label: '4000$',
    },
    {
      value: 5000,
      label: '5000$',
    },
    {
      value: 6000,
      label: '6000$',
    },
    {
      value: 7000,
      label: '7000$',
    },
  ];

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

  function valueDollar(value) {
    return `${value}$`;
  }
  function valueStar(value) {
    return `${value}`;
  }

const CorpTraineeSearch = () => {
    const [queryS, setQueryS] = useState("");
    const [queryF1, setQueryF1] = useState("");
    const [queryF2, setQueryF2] = useState("");
    const [courses, setCourses] = useState([]);
    const keys = ["courseTitle","subject","instructor"];   

    // To fetch all the courses and put the results in courses
    useEffect(()=>{
        const fetchCourses = async () => {
            const response = await fetch('/course');
            const json = await response.json();
            if(response.ok){
                setCourses(json)
            }
        }


        fetchCourses();
    }, [])

    // GET all course subjects
    // const getCourseSubjects = (arr) =>{
    //    const newArray = [];
    //    for(let i =0;i<arr.length;i++){
    //     if(!newArray.includes(arr[i].subject)){
    //     newArray[i] = arr[i].subject;
    //     }
    //    }
    //    return newArray;
    // }

    // to Perform the intersection between the search elements and filter elements
    const performIntersection = (arr1, arr2, arr3) => {

        const intersectionResult1 = arr1.filter(x => arr2.indexOf(x) !== -1);
        const intersectionResult2 = intersectionResult1.filter(x => arr3.indexOf(x) !== -1);
     
        return intersectionResult2;
    
    }

    // Search method
    const searchMethod = (courseData) =>{
        return courseData.filter((item)=>
        keys.some((key)=>item[key].toString().toLowerCase().includes(queryS.toString().toLowerCase()))
        );
    }

    // Price filter method
    const filterMethodOnPrice = (courseData) =>{
        console.log(queryF1);
        if((!queryF1 ||  queryF1 === -500) && queryF1 !== 0){
            return courseData;
        }
        else{
            return courseData.filter(item=> item.price === queryF1);
        }
    }

    // Rating filter method
    const filterMethodOnRating = (courseData) =>{
        console.log(queryF2);
        if((!queryF2 ||  queryF2 === -0.5) && queryF2 !== 0){
            return courseData;
        }
        else{
            return courseData.filter(item=> item.courseRating === queryF2);
        }
    }

    


    return (
        <div>
        <div className='homesearch-component'>
            <input type='text' placeholder='Search Course...' className='search' onChange={e=>setQueryS(e.target.value)}/>
            <div className='filter-component1'>
                <p><strong>Price Filter</strong></p>
                <Box sx={{ width: 950 }}>
                <Slider className='price-slider'  aria-label="Always visible" getAriaValueText={valueDollar}  marks={priceMarks}  valueLabelDisplay="on" size= "small" max = {7000} step={500} min = {-500} name = 'Price-filter' onChangeCommitted={(e,v)=>{setQueryF1(v)}}/> 
                </Box>
            </div>
            <div className='homefilter-component2'>
                <p><strong>Rating Filter</strong></p>
                <Box sx={{ width: 950 }}>
                <Slider className='rating-slider' aria-label="Always visible" getAriaValueText={valueStar}  marks={ratingMarks}  valueLabelDisplay="on" size= "small" max = {5} step={0.5} min = {-0.5} name = 'Rating-filter' onChangeCommitted={(e,v)=>{setQueryF2(v)}}/> 
                </Box>
            </div>         
             <div className="home-search">
                {performIntersection(filterMethodOnPrice(courses),searchMethod(courses),filterMethodOnRating(courses)) && performIntersection(filterMethodOnPrice(courses),searchMethod(courses),filterMethodOnRating(courses)).map((course)=>(
                     <div>
                     <p key = {course._id}>Course: {course.courseTitle} | Total Hours: {course.totalHours} | Rating = {course.courseRating} Out of 5</p>
                     </div>
                ))}
            </div> 
        </div>
        </div>
    )


}

export default CorpTraineeSearch;