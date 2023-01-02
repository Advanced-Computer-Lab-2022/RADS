import { useState,useEffect } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";

const CourseCreate = (props) => {
    const {
        rateVal,
        currencyVal,
        token
    } = props;
    const decode = jwt_decode(token);
    const instructorId = decode.id;
    const [courseTitle, setCourseTitle] = useState('');
    const [subtitles, setSubtitles] = useState([{ subTitle: "", description: "", videoLink: "", hours: "" }]);
    const [price, setPrice] = useState('');
    const [shortSummary, setShortSummary] = useState('');
    const [subject, setSubject] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [courseExercises, setCourseExercises] = useState([{ question: "", firstChoice: "", secondChoice: "", thirdChoice: "", fourthChoice: "", answer: "" }]);
    const [exam, setExam] = useState([{ question: "", firstChoice: "", secondChoice: "", thirdChoice: "", fourthChoice: "", answer: "" }]);
    const [coursePreview, setCoursePreview] = useState('');
    const [error, setError] = useState(null);
    const [instructorName,setinstructorName] = useState("");

    useEffect(() => {
        const fetchInstructor = async () => {
            axios
                .get(`/instructor/${instructorId}`)
                .then((res) => {
                    setinstructorName(res.data.firstName + " " + res.data.lastName);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchInstructor();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault() //prevent form submission   
        let instructor = instructorId;
        const course = { courseTitle, subtitles, price, shortSummary, subject, totalHours, instructor,instructorName, courseExercises, exam, coursePreview };
        const response = await fetch('/course/add', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setCourseTitle("");
      setSubtitles([
        { subTitle: "", description: "", videoLink: "", hours: "" },
      ]);
      setPrice("");
      setShortSummary("");
      setSubject("");
      setTotalHours("");
      setCourseExercises([
        {
          question: "",
          firstChoice: "",
          secondChoice: "",
          thirdChoice: "",
          fourthChoice: "",
          answer: "",
        },
      ]);
      setExam([
        {
          question: "",
          firstChoice: "",
          secondChoice: "",
          thirdChoice: "",
          fourthChoice: "",
          answer: "",
        },
      ]);
      setCoursePreview("");
      setError(null);
      console.log("New Course Added", json);
      window.location.reload();
    }
  };

  const handleSubtitleAdd = () => {
    setSubtitles([
      ...subtitles,
      { subTitle: "", description: "", videoLink: "", hours: "" },
    ]);
  };
  const setCourseSubTitle = (e, index) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...subtitles];
    list[index][name] = value;
    setSubtitles(list);
  };
  const setCourseSubDesc = (e, index) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...subtitles];
    list[index][name] = value;
    setSubtitles(list);
  };
  const setVidLink = (e, index) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...subtitles];
    list[index][name] = value;
    setSubtitles(list);
  };
  const setSubHours = (e, index) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...subtitles];
    list[index][name] = value;
    setSubtitles(list);
  };

  const handleExerciseAdd = () => {
    setCourseExercises([
      ...courseExercises,
      {
        question: "",
        firstChoice: "",
        secondChoice: "",
        thirdChoice: "",
        fourthChoice: "",
        answer: "",
      },
    ]);
  };
  const setQuestion = (e, index2) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...courseExercises];
    list[index2][name] = value;
    setCourseExercises(list);
  };
  const setFirstChoice = (e, index2) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...courseExercises];
    list[index2][name] = value;
    setCourseExercises(list);
  };
  const setSecondChoice = (e, index2) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...courseExercises];
    list[index2][name] = value;
    setCourseExercises(list);
  };
  const setThirdChoice = (e, index2) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...courseExercises];
    list[index2][name] = value;
    setCourseExercises(list);
  };

  const setFourthChoice = (e, index2) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...courseExercises];
    list[index2][name] = value;
    setCourseExercises(list);
  };

  const setAnswer = (e, index2) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...courseExercises];
    list[index2][name] = value;
    setCourseExercises(list);
  };

  const handleExamExerciseAdd = () => {
    setExam([
      ...exam,
      {
        question: "",
        firstChoice: "",
        secondChoice: "",
        thirdChoice: "",
        fourthChoice: "",
        answer: "",
      },
    ]);
  };
  const setEQuestion = (e, index3) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...exam];
    list[index3][name] = value;
    setExam(list);
  };
  const setEFirstChoice = (e, index3) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...exam];
    list[index3][name] = value;
    setExam(list);
  };
  const setESecondChoice = (e, index3) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...exam];
    list[index3][name] = value;
    setExam(list);
  };
  const setEThirdChoice = (e, index3) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...exam];
    list[index3][name] = value;
    setExam(list);
  };

  const setEFourthChoice = (e, index3) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...exam];
    list[index3][name] = value;
    setExam(list);
  };

  const setEAnswer = (e, index3) => {
    const { name, value } = e.target;
    console.log(e.target);
    const list = [...exam];
    list[index3][name] = value;
    setExam(list);
  };

  return (
    <Box className="card-border">
      <form className="create-course" onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: "4px" }}>Insert Course Information</h3>

        <Grid container>
          <Grid md={2}></Grid>
          <Grid md={5}>
            <label className="create-course">Course Title:</label>
          </Grid>
          <Grid md={3}>
            <TextField
              sx={{ marginBottom: "2px" }}
              size="small"
              type="text"
              onChange={(e) => setCourseTitle(e.target.value)}
              value={courseTitle}
            />
          </Grid>
          <Grid md={2}></Grid>
        </Grid>

        <Grid container>
          <Grid md={2}></Grid>
          <Grid md={5}>
            <label className="create-course">Course Preview Video Link: </label>
          </Grid>
          <Grid md={3}>
            <TextField
              sx={{ marginBottom: "2px" }}
              size="small"
              type="text"
              onChange={(e) => setCoursePreview(e.target.value)}
              value={coursePreview}
            />
          </Grid>
          <Grid md={2}></Grid>
        </Grid>

        <Grid container>
          <Grid md={2}></Grid>
          <Grid md={5}>
            <label className="create-course">Price: </label>
          </Grid>
          <Grid md={3}>
            <TextField
              sx={{ marginBottom: "2px" }}
              size="small"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </Grid>
          <Grid md={2}></Grid>
        </Grid>

        <Grid container>
          <Grid md={2}></Grid>
          <Grid md={5}>
            <label className="create-course">
              Short summary about the course:{" "}
            </label>
          </Grid>
          <Grid md={3}>
            <TextField
              sx={{ marginBottom: "2px" }}
              size="small"
              type="text"
              onChange={(e) => setShortSummary(e.target.value)}
              value={shortSummary}
            />
          </Grid>
          <Grid md={2}></Grid>
        </Grid>

        <Grid container>
          <Grid md={2}></Grid>
          <Grid md={5}>
            <label className="create-course">Subject of the course: </label>
          </Grid>
          <Grid md={3}>
            <TextField
              sx={{ marginBottom: "2px" }}
              size="small"
              type="text"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />
          </Grid>
          <Grid md={2}></Grid>
        </Grid>

        <Grid container>
          <Grid md={2}></Grid>
          <Grid md={5}>
            <label className="create-course">Total Hours of the course: </label>
          </Grid>
          <Grid md={3}>
            <TextField
              sx={{ marginBottom: "2px" }}
              size="small"
              type="number"
              onChange={(e) => setTotalHours(e.target.value)}
              value={totalHours}
            />
          </Grid>
          <Grid md={2}></Grid>
        </Grid>
        <br></br>

        <Box>
          <h4 style={{ marginBottom: "4px" }}>Subtitles: </h4>
          {subtitles.map((subtitle, index) => (
            <Box key={index} className="subtitles">
              <Box className="add-subtitle">
                <Grid container>
                  <Grid md={2}>Subtitle #{index + 1}</Grid>
                  <Grid md={5}>
                    <label className="create-course">Title :</label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="subTitle"
                      type="text"
                      onChange={(e) => setCourseSubTitle(e, index)}
                      value={subtitle.subTitle}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Description: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="description"
                      type="text"
                      onChange={(e) => setCourseSubDesc(e, index)}
                      value={subtitle.description}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Video Link: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="videoLink"
                      type="text"
                      onChange={(e) => setVidLink(e, index)}
                      value={subtitle.videoLink}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Subtitle hours: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="hours"
                      type="number"
                      onChange={(e) => setSubHours(e, index)}
                      value={subtitle.hours}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>
                {subtitles.length - 1 === index && (
                  <Button
                    variant="contained"
                    type="button"
                    className="add-btn"
                    onClick={handleSubtitleAdd}
                  >
                    Add a Subtitle
                  </Button>
                )}
              </Box>
            </Box>
          ))}
          <br></br>
        </Box>

        <Box>
          <h4 style={{ marginBottom: "4px" }}>Subtitle Exercises: </h4>
          {courseExercises.map((exercise, index2) => (
            <Box key={index2} className="exercises">
              <Box className="add-exercise">
                <Grid container>
                  <Grid md={2}>Exercise #{index2 + 1}</Grid>
                  <Grid md={5}>
                    <label className="create-course">Question :</label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="question"
                      type="text"
                      onChange={(e) => setQuestion(e, index2)}
                      value={exercise.question}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">First Choice: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="firstChoice"
                      type="text"
                      onChange={(e) => setFirstChoice(e, index2)}
                      value={exercise.firstChoice}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Second Choice: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="secondChoice"
                      type="text"
                      onChange={(e) => setSecondChoice(e, index2)}
                      value={exercise.secondChoice}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Third Choice: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="thirdChoice"
                      type="text"
                      onChange={(e) => setThirdChoice(e, index2)}
                      value={exercise.thirdChoice}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Fourth Choice: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="fourthChoice"
                      type="text"
                      onChange={(e) => setFourthChoice(e, index2)}
                      value={exercise.fourthChoice}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Answer: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="answer"
                      type="text"
                      onChange={(e) => setAnswer(e, index2)}
                      value={exercise.answer}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                {courseExercises.length - 1 === index2 && (
                  <Button
                    variant="contained"
                    type="button"
                    className="add-btn"
                    onClick={handleExerciseAdd}
                  >
                    Add an Exercise
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        <Box>
          <h4 style={{ marginBottom: "4px" }}>Exam Exercises: </h4>
          {exam.map((exercise, index3) => (
            <Box key={index3} className="exam=exercises">
              <Box className="add-exercise">
                <Grid container>
                  <Grid md={2}>Exercise #{index3 + 1}</Grid>
                  <Grid md={5}>
                    <label className="create-course">Question :</label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="question"
                      type="text"
                      onChange={(e) => setEQuestion(e, index3)}
                      value={exercise.question}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">First Choice: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="firstChoice"
                      type="text"
                      onChange={(e) => setEFirstChoice(e, index3)}
                      value={exercise.firstChoice}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Second Choice: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="secondChoice"
                      type="text"
                      onChange={(e) => setESecondChoice(e, index3)}
                      value={exercise.secondChoice}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Third Choice: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="thirdChoice"
                      type="text"
                      onChange={(e) => setEThirdChoice(e, index3)}
                      value={exercise.thirdChoice}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Fourth Choice: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="fourthChoice"
                      type="text"
                      onChange={(e) => setEFourthChoice(e, index3)}
                      value={exercise.fourthChoice}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                <Grid container>
                  <Grid md={2}></Grid>
                  <Grid md={5}>
                    <label className="create-course">Answer: </label>
                  </Grid>
                  <Grid md={3}>
                    <TextField
                      sx={{ marginBottom: "2px" }}
                      size="small"
                      name="answer"
                      type="text"
                      onChange={(e) => setEAnswer(e, index3)}
                      value={exercise.answer}
                    />
                  </Grid>
                  <Grid md={2}></Grid>
                </Grid>

                {exam.length - 1 === index3 && (
                  <Button
                    variant="contained"
                    type="button"
                    className="add-btn"
                    onClick={handleExamExerciseAdd}
                  >
                    Add an Exercise
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
        {error && <Box className="error">{error}</Box>}
      </form>
    </Box>
  );
};

export default CourseCreate;
