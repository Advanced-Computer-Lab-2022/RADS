// import axios from 'axios';
import { useState,useEffect } from 'react';

const CorpView =(props)=>{
    const{
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const instruId = params.get('instructorId');
    const [reviews,setReviews] = useState([]);
    const [instructor,setInstructor] = useState('');
           


    useEffect(() => {
        const fetchInstructor = async() => {
            const response = await fetch(`/instructor/${instruId}`);
            const json = await response.json();
            if (response.ok) {
                console.log(json);
                setInstructor(json);
                setReviews(json.reviews);
            }
        }
        fetchInstructor();
    }, [])
    
   
return(
    <div>
            <p><strong>Reviews & Ratings of instructor: {instructor.firstName} {' '} {instructor.lastName}</strong></p>
            <p>Current Rating: {instructor.instructorRating.rating}</p>
            <p>Reviews:</p>
            {reviews && reviews.map((review,index)=>(
                 <div>
                 <p>Review {index}: {review.traineeReview}</p>
                 </div>
            ))}
    </div>
)
}


export default CorpView;