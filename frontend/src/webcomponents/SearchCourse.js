import React from 'react'
import { useEffect,useState } from "react"
import CourseTable from './CourseTable';


const SearchCourse = () => {
    const [query, setQuery] = useState("");
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

    const searchMethod = (courseData) =>{
        return courseData.filter((item)=>
        keys.some((key)=>item[key].toString().toLowerCase().includes(query.toLowerCase()))
        );
    }



    return (
        <div>
        <div className='search-component'>
            <input type='text' placeholder='Search Course...' className='search' onChange={e=>setQuery(e.target.value)}/>
               <CourseTable data={searchMethod(courses)} />    
        </div>
        </div>
    )


}

export default SearchCourse;