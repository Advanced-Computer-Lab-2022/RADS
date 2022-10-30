import React from 'react'
import { useEffect,useState } from "react"
import CourseTable from './CourseTable';
import Slider from '@material-ui/core/Slider';


const SearchCourse = () => {
    const [queryS, setQueryS] = useState("");
    const [queryF, setQueryF] = useState("");
    const [courses, setCourses] = useState([]);
    const keys = ["courseTitle","subject","instructor", "price"];   

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
    const performIntersection = (arr1, arr2) => {

        const intersectionResult = arr1.filter(x => arr2.indexOf(x) !== -1);
     
        return intersectionResult;
    
    }

    const searchMethod = (courseData) =>{
        return courseData.filter((item)=>
        keys.some((key)=>item[key].toString().toLowerCase().includes(queryS.toString().toLowerCase()))
        );
    }
    const filterMethodOnPrice = (courseData) =>{
        if(queryF === 0){
            return courseData;
        }
        else{
            return courseData.filter(item=> item.price === queryF);
        }
    }


    return (
        <div>
        <div className='search-component'>
            <input type='text' placeholder='Search Course...' className='search' onChange={e=>setQueryS(e.target.value)}/>
            <div className='filter-component'>
                <p>Price Filter</p>
                <Slider className='price-slider' max = {10000} step={10} min = {0} name = 'Price filter' onChangeCommitted={(e,v)=>{setQueryF(v)}}/> 
            </div>
            
             <CourseTable data={performIntersection(filterMethodOnPrice(courses),searchMethod(courses))} />   
        </div>
        </div>
    )


}

export default SearchCourse;