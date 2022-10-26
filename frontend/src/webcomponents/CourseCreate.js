import { useState } from "react"

const CourseCreate = () => {
    const [courseTitle,setCourseTitle] = useState('');
    const [subtitles,setSubtitles] = useState('');
    const [price,setPrice] = useState('');
    const [shortSummary,setShortSummary] = useState('');
    const [error,setError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        
        const course = {courseTitle,subtitles,price,shortSummary};
        
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

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default CourseCreate;