import { Box } from "@mui/material";

const CourseDetails = ({course}) =>{
    return(
        <Box className="course-details">
            <h4>The information of course: {course.courseTitle} </h4>
            <p><strong>Course Subtitles: </strong>{course.subtitles}</p>
            <p><strong>Price: </strong>{course.price}</p>
            <p><strong>Short Summary about the Course: </strong>{course.shortSummary}</p>
            <p><strong>Subject of the course: </strong>{course.subject}</p>
            <p><strong>Instructor of the course: </strong>{course.instructor}</p>
            <p><strong>Rating of the course: </strong>{course.courseRating} Out of 5</p>
            <p><strong>Course Exercises: </strong>{course.courseExercises}</p>
            <p><strong>============================================================================================================</strong></p>
        </Box>
    )
}


export default CourseDetails;