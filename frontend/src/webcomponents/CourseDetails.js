const CourseDetails = ({course}) =>{
    return(
        <div className="course-details">
            <h4>The information of course:{course.courseTitle}</h4>
            <p><strong>Course Subtitles: </strong>{course.subtitles}</p>
            <p><strong>Price: </strong>{course.price}</p>
            <p><strong>Short Summary about the Course: </strong>{course.shortSummary}</p>
            <p><strong>Subject of the course: </strong>{course.subject}</p>
            <p><strong>Instructor of the course: </strong>{course.instructor}</p>
            <p><strong>Rating of the course</strong>{course.rating}</p>
            <p><strong>=========================================================================================</strong></p>
        </div>
    )
}


export default CourseDetails;