import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const CorpTraineeViewReports = (props) => {
  const { rateVal, currencyVal } = props;
  const params = new URLSearchParams(window.location.search);
  const corpTraineeId = params.get("corptraineeId");
  const [corpTrainee, setCorpTrainee] = useState([]);
  const [resolvedReports, setResolvedReports] = useState([]);
  const [unResolvedReports, setUnResolvedReports] = useState([]);

  useEffect(() => {
    const fetchCorpTrainee = async () => {
      axios
        .get(`/corptrainee/${corpTraineeId}`)
        .then((res) => {
          setCorpTrainee(res.data);
          findResolvedCurrentReports();
          findUnresolvedCurrentReports();
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCorpTrainee();
  }, []);

  const findResolvedCurrentReports = async () => {
    const response = await fetch(
      `/report/getcorptraineeresolved/${corpTraineeId}`
    );
    const json = await response.json();
    if (response.ok) {
      setResolvedReports(json);
    }
  };

  const findUnresolvedCurrentReports = async () => {
    const response = await fetch(
      `/report/getcorptraineeunresolved/${corpTraineeId}`
    );
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setUnResolvedReports(json);
    }
  };
  return (
    <Box>
      <h3>
        <strong>VIEW YOUR REPORTS</strong>
      </h3>
      <br />
      {resolvedReports.length === 0 && unResolvedReports.length === 0 ? (
        <Box>You dont have any reports.</Box>
      ) : (
        <Box>
          {resolvedReports.length !== 0 ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <p className="highview-p">
                    <strong>Resolved Reports</strong>
                  </p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box className="highestviewed-courses card-container">
                    <Box className="card-container">
                      <Box className="card-container">
                        {resolvedReports &&
                          resolvedReports.map((report, index) => (
                            <Box className="card-border">
                              <p>
                                <strong>
                                  Information of Report {index + 1}:
                                </strong>
                              </p>
                              <p>
                                Sender: {corpTrainee.firstName}{" "}
                                {corpTrainee.lastName}
                              </p>
                              <p>Type of problem: {report.requestType}</p>
                              <Box>
                                Comment/Comments:{" "}
                                {report.corptTraineeComments &&
                                  report.corptTraineeComments.map(
                                    (comment, index2) => (
                                      <p>
                                        <strong>Comment {index2 + 1}: </strong>
                                        {comment.corptTraineeComment}
                                      </p>
                                    )
                                  )}
                              </Box>
                              <p>
                                Report Status:
                                <strong>{report.reportStatus}</strong>
                              </p>
                              {report.adminCommment ? (
                                <Box>
                                  <p>Admin Reply:{report.adminCommment} </p>
                                </Box>
                              ) : (
                                "No Admin Reply"
                              )}
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            ""
          )}
          {unResolvedReports.length !== 0 ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <p className="highview-p">
                    <strong>Unresolved Reports</strong>
                  </p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box className="highestviewed-courses card-container">
                    <Box className="card-container">
                      <Box className="card-container">
                        {unResolvedReports &&
                          unResolvedReports.map((report, index1) => (
                            <Box className="card-border">
                              <p>
                                <strong>
                                  Information of Report {index1 + 1}:
                                </strong>
                              </p>
                              <p>
                                Sender: {corpTrainee.firstName}{" "}
                                {corpTrainee.lastName}
                              </p>
                              <p>Type of problem: {report.requestType}</p>
                              <Box>
                                Comment/Comments:{" "}
                                {report.corptTraineeComments &&
                                  report.corptTraineeComments.map(
                                    (comment, index2) => (
                                      <p>
                                        <strong>Comment {index2 + 1}: </strong>
                                        {comment.corptTraineeComment}
                                      </p>
                                    )
                                  )}
                              </Box>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  (window.location.href = `/corptraineefollowup?reportId=${report._id}&corpTraineeId=${corpTraineeId}`)
                                }
                              >
                                Follow Up
                              </Button>
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            ""
          )}
        </Box>
      )}
    </Box>
  );
};

export default CorpTraineeViewReports;
