// import axios from 'axios';
import { useState,useEffect } from 'react';

const InstructorRating =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const instruId = params.get('instructorId');
    const [reviews,setReviews] = useState([]);
    const [coursesReviews,setCoursesReviews] = useState([]);
    const [instructor,setInstructor] = useState('');
    const [courses,setCourses]= useState([]);
    useEffect(() => {
        const fetchInstructor = async() => {
            const response = await fetch(`/instructor/${instruId}`);
            const json = await response.json();
            if (response.ok) {
                console.log(json);
                setInstructor(json);
                setReviews(json.reviews);
                fetchInstructorCourses();
            }
        }
        fetchInstructor();
    }, [])
   
    const fetchInstructorCourses = async() =>{
        const response = await fetch(`/course/find/${instruId}`);
        const json = await response.json();
        if (response.ok) {
            console.log(json);
            setCourses(json);            
        }
    }


    const FetchReviewer = async(funcProps) => {
        let result ='';
        const{
            //ctraineeId,
            traineeId
        } = funcProps;
        //if(!ctraineeId || ctraineeId === null){
            const response = await fetch(`/trainee/${traineeId}`);
            const json = await response.json();
            if (response.ok) {
                console.log(json);
                result = `${json.firstName} ${json.lastName}`;
            }
       /* }
       else{
        const response = await fetch(`/corpTrainee/${ctraineeId}`);
        const json = await response.json();
        if (response.ok) {
            console.log(json);
            result = `${json.firstName} ${json.lastName}`;
        }
        }*/
        return (<strong>{result}</strong>);
    }
return(
    <div>
    <div>
            <p><strong>Reviews & Ratings of instructor: {instructor.firstName} {' '} {instructor.lastName}</strong></p>
            <p>Current Total Rating: {instructor.instructorRating} out of 5.</p>
            {reviews && reviews.map((review,index)=>(
                 <div>
                 <p>Review {index + 1}: Rating: {review.iRating} out of 5.</p>
                 <p>{review.iReview}</p>
                 <p>{review.traineeId}</p>
                 <p>{review.corpTraineeId}</p>
                 </div>
            ))}
    </div>

    <div>
        <p><strong>Reviews & Ratings of instructor courses</strong></p>
    {courses && courses.map((course,index)=>(
          <div key = {course._id}>
          <h4>Course {index + 1}:<strong> {course.courseTitle} </strong></h4>
          <p>Current Total Rating: {course.courseRating} out of 5.</p>
          {course.reviews && course.reviews.map((review,index)=>(
                <div>
                <p>Rating {index+1}: {review.cRating} out of 5.</p>
                <p>Review {index+1}:{review.cReview}</p>
                </div>
             ))}
            <p><strong>============================================================================================================</strong></p>
                </div>
             ))}
    </div>
    </div>
)
}


export default InstructorRating;