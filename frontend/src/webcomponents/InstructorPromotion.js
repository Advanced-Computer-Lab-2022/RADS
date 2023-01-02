import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
const InstructorPromotion = (props) => {
 const [selectedCourseId, setSelectedCourseId] = useState("");
 const [promotionStartDate, setPromotionStartDate] = useState("");
 const [promotionEndDate, setPromotionEndDate] = useState("");
 const [promotionRate, setPromotionRate] = useState("");
 const [error, setError] = useState(null);
 const [text, setText] = useState("");
 const [courses, setCourses] = useState([]);
 const { rateVal, currencyVal, token } = props;

 //const params = new URLSearchParams(window.location.search);
 const decode = jwt_decode(token);
 const instruId = decode.id;

useEffect(() => {
  const fetchCourses = async () => {
    const response = await fetch(`/course/find/${instruId}`);
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setCourses(json);
    }
  };
  fetchCourses();
}, []);
    const handleChange = (e) => {
    setSelectedCourseId(e.target.value);
    console.log(e.target.value);
  };
  const HandleStartDate = (e) => {
    setPromotionStartDate(e.target.value);
  };
  const HandleEndDate = (e) => {
    setPromotionEndDate(e.target.value);
  };
  const HandlePromotionVal = (e) => {
    console.log(e.target.value);
    setPromotionRate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent form submission
    const promo = { promotionStartDate, promotionEndDate, promotionRate };
    const response = await fetch(`/course/promo/${selectedCourseId}`, {
      method: "POST",
      body: JSON.stringify(promo),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setSelectedCourseId("");
      setPromotionStartDate("");
      setPromotionEndDate("");
      setPromotionRate("");
      setText("Promotion inserted !");
      setError(null);
      console.log("New promotion Added", json);
    }
  };
    return (
      <box className="instructor-promotion">
        <p>
          <strong>Enter a promotion for a course:</strong>
        </p>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: 300 }} className="create-promotion">
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCourseId}
              label="Course"
              onChange={handleChange}
            >
              {courses.map((course) => (
                <MenuItem value={course._id}> {course.courseTitle}</MenuItem>
              ))}
            </Select>
            <label>Starting Date</label>
            <input
              type="date"
              value={promotionStartDate}
              onChange={HandleStartDate}
            />
            <label>Ending Date</label>
            <input
              type="date"
              value={promotionEndDate}
              onChange={HandleEndDate}
            />
            <label>Promotion Precentage:</label>
            <input
              type="range"
              value={promotionRate}
              onChange={HandlePromotionVal}
            />
            <p>Value: {promotionRate}</p>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
          <p>
            <strong>{text}</strong>
          </p>
        </Box>
      </box>
    );
}
 
export default InstructorPromotion;