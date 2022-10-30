import { useState } from "react"

const CourseCreate = () => {
    const [courseTitle,setCourseTitle] = useState('');
    const [subtitles,setSubtitles] = useState('');
    const [price,setPrice] = useState('');
    const [shortSummary,setShortSummary] = useState('');
    const [subject,setSubject] = useState('');
    const [totalHours,setTotalHours] = useState('');
    const [instructor,setInstructor] = useState('');
    const [courseRating, setCourseRating] = useState('');
    const [courseExercises,setCourseExercises] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const course = {courseTitle,subtitles,price,shortSummary,subject,totalHours,instructor,courseRating,courseExercises};
        
        const response = await fetch('/course/add',{
            method:'POST',
            body: JSON.stringify(course),
            headers:{
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){    
            setCourseTitle('');
            setSubtitles('');
            setPrice('');
            setShortSummary('');
            setSubject('');
            setTotalHours('');
            setInstructor('');
            setCourseRating('');
            setCourseExercises('');
            setError(null);
            console.log("New Course Added", json);
        }
    }    

    return (
        <form className="create-course" onSubmit={handleSubmit}>
            <h3>Insert Course Information</h3>
           
            <label>Course Title:</label>
            <input type="text" onChange={(e) => setCourseTitle(e.target.value)}
            value= {courseTitle}
            />

            <label>Subtitles: </label>
            <input type="text" onChange={(e) => setSubtitles(e.target.value)}
            value= {subtitles}
            />

            <label>Price: </label>
            <input type="number" onChange={(e) => setPrice(e.target.value)}
            value= {price}
            />

            <label>Short summary about the course: </label>
            <input type="text" onChange={(e) => setShortSummary(e.target.value)}
            value= {shortSummary}
            />

            <label>Subject of the course: </label>
            <input type="text" onChange={(e) => setSubject(e.target.value)}
            value= {subject}
            />

            <label>Total Hours of the course: </label>
            <input type="number" onChange={(e) => setTotalHours(e.target.value)}
            value= {totalHours}
            />

            <label>Instructor of the course: </label>
            <input type="text" onChange={(e) => setInstructor(e.target.value)}
            value= {instructor}
            />
            
            <label>Course Rating: </label>
            <input type="text" onChange={(e) => setCourseRating(e.target.value)}
            value= {courseRating}
            />

            <label>Course Exercises: </label>
            <input type="text" onChange={(e) => setCourseExercises(e.target.value)}
            value= {courseExercises}
            />

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default CourseCreate;