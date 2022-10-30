import React from 'react'
import { useEffect,useState } from "react"
import CourseTable from './CourseTable';
import Slider from '@material-ui/core/Slider';


const SearchCourse = () => {
    const [queryS, setQueryS] = useState("");
    const [queryF1, setQueryF1] = useState("");
    const [queryF2, setQueryF2] = useState("");
    const [courses, setCourses] = useState([]);
    const keys = ["courseTitle","subject","instructor"];   

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
    const performIntersection = (arr1, arr2, arr3) => {

        const intersectionResult1 = arr1.filter(x => arr2.indexOf(x) !== -1);
        const intersectionResult2 = intersectionResult1.filter(x => arr3.indexOf(x) !== -1);
     
        return intersectionResult2;
    
    }

    const searchMethod = (courseData) =>{
        return courseData.filter((item)=>
        keys.some((key)=>item[key].toString().toLowerCase().includes(queryS.toString().toLowerCase()))
        );
    }
    const filterMethodOnPrice = (courseData) =>{
        console.log(queryF1);
        if(!queryF1 ||  queryF1 === 0){
            return courseData;
        }
        else{
            return courseData.filter(item=> item.price === queryF1);
        }
    }

    const filterMethodOnRating = (courseData) =>{
        console.log(queryF2);
        if(!queryF2 ||  queryF2 === 0){
            return courseData;
        }
        else{
            return courseData.filter(item=> item.courseRating === queryF2);
        }
    }

    


    return (
        <div>
        <div className='search-component'>
            <input type='text' placeholder='Search Course...' className='search' onChange={e=>setQueryS(e.target.value)}/>
            <div className='filter-component1'>
                <p>Price Filter</p>
                <Slider className='price-slider' max = {10000} step={1000} min = {0} name = 'Price-filter' onChangeCommitted={(e,v)=>{setQueryF1(v)}}/> 
            </div>
            <div className='filter-component2'>
                <p>Rating Filter</p>
                <Slider className='rating-slider' max = {5} step={0.5} min = {0} name = 'Rating-filter' onChangeCommitted={(e,v)=>{setQueryF2(v)}}/> 
            </div>
            
             <CourseTable data={performIntersection(filterMethodOnPrice(courses),searchMethod(courses),filterMethodOnRating(courses))} />   
        </div>
        </div>
    )


}

export default SearchCourse;