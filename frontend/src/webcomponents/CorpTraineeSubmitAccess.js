import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button } from "@mui/material";

const CorpTraineeSubmitAccess = (props) => {
  const { rateVal, currencyVal } = props;
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("courseId");
  const corpTraineeId = params.get("corpTraineeId");
  const [course, setCourse] = useState([]);
  const [corpTrainee, setCorpTrainee] = useState([]);
  const [instructorName, setinstructorName] = useState([]);
  const [corpTraineeComment, setCorpTraineeComment] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/course/${courseId}`);
      const json = await response.json();
      if (response.ok) {
        setCourse(json);
        fetchInstructor(json.instructor);
        fetchCorpTrainee();
      }
    };
    fetchCourse();
  }, []);

  const fetchCorpTrainee = async () => {
    axios
      .get(`/corptrainee/${corpTraineeId}`)
      .then((res) => {
        setCorpTrainee(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchInstructor = async (instID) => {
    axios
      .get(`/instructor/${instID}`)
      .then((res) => {
        setinstructorName(res.data.firstName + " " + res.data.lastName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAccessRequest = async () => {
    let requestType = "Access";
    const body = { corpTraineeId, courseId, requestType };
    const response = await fetch(`/report/postrequest`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      postComment(json);
    }
  };

  const postComment = async (reportId) => {
    const body = { corpTraineeComment };
    const response = await fetch(`/report/corptraineepostcomment/${reportId}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      setHtml("Request Sent Successfully!");
    }
  };

  const handleAccess = (e) => {
    e.preventDefault();
    handleAccessRequest();
  };

  return (
    <Box>
      <h1>
        <bold>
          <strong>Access Form</strong>
        </bold>
      </h1>
      <form onSubmit={handleAccess}>
        <p>
          <strong>
            Course <strong>{course.courseTitle}</strong>
          </strong>
        </p>
        <label>Enter a reason why you would like to access the Course.</label>
        <input
          type="text"
          value={corpTraineeComment}
          onChange={(e) => setCorpTraineeComment(e.target.value)}
        ></input>
        <Button type='submit' variant="contained">Send</Button>
      </form>
      <p>
        <strong>{html}</strong>
      </p>
    </Box>
  );
};

export default CorpTraineeSubmitAccess;
