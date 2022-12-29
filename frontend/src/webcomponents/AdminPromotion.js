import { Button, Link } from "@mui/material";
import { useState, useEffect } from "react"
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
const AdminPromotion = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('adminId');
    const [courses, setCourses] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [request, setRequest] = useState([]);
    const [checkedCourses, setCheckedCourses] = useState([]);
    const newKeys = ["_id"];
    const [promotionStartDate, setPromotionStartDate] = useState("");
    const [promotionEndDate, setPromotionEndDate] = useState("");
    const [promotionRate, setPromotionRate] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/course`);
            const json = await response.json();
            if (response.ok) {
                setCourses(json);
            }
        }
        fetchCourse();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const ids = checkedCourses;
        let body = { ids, promotionStartDate, promotionEndDate, promotionRate };
        if (ids === []) {
            setText("No courses selected.");
        }
        else {
            axios
                .post(`/course/coursespostpromotion`, body)
                .then((res) => {
                    setText(res.data.message);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    };
    const handlePromotion = (e) => {
        var updatedCourseList = [...checkedCourses];
        let current = courses.filter((item) =>
            newKeys.some((key) =>
                item[key]
                    .toString()
                    .toLowerCase()
                    .includes(e.target.value.toString().toLowerCase())
            )
        );
        if (e.target.checked) {
            updatedCourseList = [...checkedCourses].concat(current);
        } else {
            console.log(updatedCourseList.length);
            for (let i = 0; i < updatedCourseList.length; i++) {
                if (updatedCourseList[i]["_id"] === e.target.value) {
                    console.log(updatedCourseList[i]["_id"] + " at " + i);
                    updatedCourseList.splice(i, 1);
                    i--;
                }
            }
        }
        setCheckedCourses(updatedCourseList);
    };

    return (
        <Box>

            <box className="admin-promo">
                <box className="list-container-promo">
                    {courses.map((course) => (
                        <box>
                            <span>{course.courseTitle}</span>
                            <input
                                value={course._id}
                                name={course.courseTitle}
                                type="checkbox"
                                onChange={(e) => {
                                    handlePromotion(e);
                                }}
                            />
                            <br />
                        </box>
                    ))}
                </box>
            </box>
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ width: 300 }} className="create-promotion">
                    <label>Starting Date</label>
                    <input
                        type="date"
                        value={promotionStartDate}
                        onChange={(e) => setPromotionStartDate(e.target.value)}
                    />
                    <label>Ending Date</label>
                    <input
                        type="date"
                        value={promotionEndDate}
                        onChange={(e) => setPromotionEndDate(e.target.value)}
                    />
                    <label>Promotion Precentage:</label>
                    <input
                        type="range"
                        value={promotionRate}
                        onChange={(e) => setPromotionRate(e.target.value)}
                    />
                    <p>Value: {promotionRate}</p>
                    
                    {checkedCourses.length === 0? (<Box><strong>Select the Courses you want to promote.</strong></Box>) : (<Button
          variant="contained" type='submit' onClick={handleSubmit} >Submit</Button>)}
                </FormControl>
                <p>
                    <strong>{text}</strong>
                </p>
            </Box>
        </Box>
    )
}



export default AdminPromotion;