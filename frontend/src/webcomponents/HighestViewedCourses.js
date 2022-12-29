import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import CourseCard from "./CourseCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const HighestViewedCourses = (props) => {
    const { highestViewedCourses, rateVal, currencyVal, todayDate, courseView1, courseView2, traineeId } = props;
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <p className="highview-p">
            <strong>Highest Viewed Courses</strong>
          </p>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <Box className="highestviewed-courses card-container">
            <Box className="card-container">
              {highestViewedCourses.map((course) => (
                <Box>
                  <CourseCard
                    course={course}
                    rateVal={rateVal}
                    currencyVal={currencyVal}
                    todayDate={todayDate}
                    courseView1={courseView1}
                    courseView2={courseView2}
                    id={traineeId}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
 
export default HighestViewedCourses;