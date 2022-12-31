const CourseTable = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Course Title</th>
          <th>Subtitles</th>
          <th>Price</th>
          <th>Short summary</th>
          <th>Subject</th>
          <th>Total hours</th>
          <th>Instructor of the course</th>
          <th>Rating</th>
          <th>Course exercises</th>
        </tr>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.courseTitle}</td>
            <td>{item.subtitles}</td>
            <td>{item.price}</td>
            <td>{item.shortSummary}</td>
            <td>{item.subject}</td>
            <td>{item.totalHours}</td>
            <td>{item.instructor}</td>
            <td>{item.courseRating}</td>
            <td>{item.courseExercises}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
