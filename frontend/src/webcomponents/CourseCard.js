import React from "react";
import { Card, CardMedia, CardContent, CardActions, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CourseCard = ({
  course,
  rateVal,
  currencyVal,
  todayDate,
  courseView1,
  courseView2,
  id,
}) => {
  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  return (
    <Card
      className="card"
      sx={{ boxShadow: "1px 1px 1px 1px rgba(34, 34, 34, 0.36)" }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        src={`https://img.youtube.com/vi/${youtube_parser(
          course.coursePreview
        )}/0.jpg`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Course: {course.courseTitle}
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            <p className="course-hours-card">
              Total Hours: {course.totalHours}
            </p>
            <p className="course-rating-card">
              Rating = {course.courseRating} Out of 5{" "}
            </p>
            <p className="course-price-card">
              Price = {Math.ceil(course.price * rateVal)} {currencyVal}{" "}
            </p>
          </Typography>
          {course.promotionEndDate &&
          new Date(course.promotionEndDate) >= todayDate ? (
            <p className="course-promo-card">
              Promotion: {course.promotionRate}% off
            </p>
          ) : (
            <br />
          )}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            if (id === "undefined" || id === undefined)
              window.location.href = `${courseView1}${course._id}${courseView2}`;
            else
              window.location.href = `${courseView1}${course._id}${courseView2}${id}`;
          }}
          key={course._id}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
