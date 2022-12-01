import { useState } from "react"


const CourseCreate = (props) => {
    const [courseTitle,setCourseTitle] = useState('');
    const [subtitles,setSubtitles] = useState([{subTitle:"",description:"",videoLink:"",hours:""}]);
    const [price,setPrice] = useState('');
    const [shortSummary,setShortSummary] = useState('');
    const [subject,setSubject] = useState('');
    const [totalHours,setTotalHours] = useState('');
    const [instructor,setInstructor] = useState('');
    const [courseRating, setCourseRating] = useState('');
    const [courseExercises,setCourseExercises] = useState([{question:"",firstChoice:"",secondChoice:"",thirdChoice:"",fourthChoice:"",answer:""}]);
    const [coursePreview,setCoursePreview] = useState('');
    const [error,setError] = useState(null);
    const{
        rateVal,
        currencyVal
    } = props;
    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent form submission
        const course = {courseTitle,subtitles,price,shortSummary,subject,totalHours,instructor,courseRating,courseExercises,coursePreview};
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
            setSubtitles([{subTitle:"",description:"",videoLink:"",hours:""}]);
            setPrice('');
            setShortSummary('');
            setSubject('');
            setTotalHours('');
            setInstructor('');
            setCourseRating('');
            setCourseExercises([{question:"",firstChoice:"",secondChoice:"",thirdChoice:"",fourthChoice:"",answer:""}]);
            setCoursePreview('');
            setError(null);
            console.log("New Course Added", json);
            window.location.reload();
        }
    }

    const handleSubtitleAdd = () =>{
        setSubtitles([...subtitles,{subTitle:"",description:"",videoLink:"",hours:""}])
        }
    const setCourseSubTitle  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setSubtitles(list);
    }
    const setCourseSubDesc  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setSubtitles(list);
    }
    const setVidLink  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setSubtitles(list);
    }
    const setSubHours  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setSubtitles(list);
    }


    const handleExerciseAdd = () =>{
        setCourseExercises([...courseExercises,{question:"",firstChoice:"",secondChoice:"",thirdChoice:"",fourthChoice:"",answer:""}])
    }
    const setQuestion  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setCourseExercises(list);
    }
    const setFirstChoice  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setCourseExercises(list);
    }
    const setSecondChoice  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setCourseExercises(list);
    }
    const setThirdChoice  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setCourseExercises(list);
    }

    const setFourthChoice  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setCourseExercises(list);
    }

    const setAnswer  = (e,index) =>{
        const {name,value} = e.target;
        console.log(e.target);
        const list = [...subtitles];
        list[index][name] = value;
        setCourseExercises(list);
    }    

    return (
        <div>
        <form className="create-course" onSubmit={handleSubmit}>
            <h3>Insert Course Information</h3>
           
            <label>Course Title:</label>
            <input type="text" onChange={(e) => setCourseTitle(e.target.value)}
            value= {courseTitle}
            />

            <label>Course Preview Video Link: </label>
            <input type="text" onChange={(e) => setCoursePreview(e.target.value)}
            value= {coursePreview}
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

            
            <br></br>

           <label>Subtitles: </label>
             {subtitles.map((subtitle,index)=>(
                <div key ={index} className="subtitles">
                <div className="add-subtitle">
            <label>Title :</label>
            <input name="subTitle" type="text" onChange={(e) => setCourseSubTitle(e,index)}
            value= {subtitle.subTitle}
            />

            <label>Description: </label>
            <input name="description" type="text" onChange={(e) => setCourseSubDesc(e,index)}
            value= {subtitle.description}
            />

            <label>Video Link: </label>
            <input name = "videoLink" type="text" onChange={(e) => setVidLink(e,index)}
            value= {subtitle.videoLink}
            />

<           label>Subtitle hours: </label>
            <input name="hours" type="number" onChange={(e) => setSubHours(e,index)}
            value= {subtitle.hours}
            />                
            {subtitles.length-1 === index &&  
            (<button type="button" className="add-btn" onClick={handleSubtitleAdd}><span>Add a Subtitle</span></button>)}
                  </div>
                </div>
             ))}
             <br></br>

            <label>Exercises: </label>
             {courseExercises.map((exercise,index)=>(
                <div key ={index} className="exercises">
                <div className="add-exercise">
            <label>Question :</label>
            <input name="question" type="text" onChange={(e) => setQuestion(e,index)}
            value= {exercise.question}
            />

            <label>First Choice: </label>
            <input name="firstChoice" type="text" onChange={(e) => setFirstChoice(e,index)}
            value= {exercise.firstChoice}
            />

            <label>Second Choice: </label>
            <input name = "secondChoice" type="text" onChange={(e) => setSecondChoice(e,index)}
            value= {exercise.secondChoice}
            />  

            <label>Third Choice: </label>
            <input name = "thirdChoice" type="text" onChange={(e) => setThirdChoice(e,index)}
            value= {exercise.thirdChoice}
            />

            <label>Fourth Choice: </label>
            <input name = "fourthChoice" type="text" onChange={(e) => setFourthChoice(e,index)}
            value= {exercise.fourthChoice}
            />

            <label>Answer: </label>
            <input name = "answer" type="text" onChange={(e) => setAnswer(e,index)}
            value= {exercise.answer}
            />
            {subtitles.length-1 === index &&  
            (<button type="button" className="add-btn" onClick={handleExerciseAdd}><span>Add an Exercise</span></button>)}
                  </div>
                </div>
             ))}

            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>

        <p> <strong>____________________________________________________________________________________________</strong></p>
        </div>
    )
}



export default CourseCreate;