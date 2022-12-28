import { Link } from "@mui/material";
import { useState, useEffect } from "react"
import axios from "axios";

const AdminProblems = (props) => {
    const {
        rateVal,
        currencyVal
    } = props;
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const requestId = params.get('requestId');
    const adminId = params.get('adminId');
    const [isCorpTrainee, setIsCorpTrainee] = useState(false);
    const [isTrainee, setIsTrainee] = useState(false);
    const [isInstructor, setIsInstructor] = useState(false);
    const [course, setCourse] = useState([]);
    const [corpTrainee, setCorpTrainee] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [instructor, setInstructor] = useState([]);
    const [request, setRequest] = useState([]);
    const [html, setHtml] = useState('');
    const [checkedOption, setCheckedOption] = useState(null);
    const [adminComment, setAdminComment] = useState('');

    useEffect(() => {
        const fetchRequest = async () => {
            const response = await fetch(`/report/request/${requestId}`);
            const json = await response.json();
            if (response.ok) {
                if ((!json.instructorId || json.instructorId === undefined) && (!json.corpTraineeId || json.corpTraineeId === undefined)) {
                    fetchTrainee(json.traineeId);
                    setIsTrainee(true);
                }

                if ((!json.traineeId || json.traineeId === undefined) && (!json.corpTraineeId || json.corpTraineeId === undefined)) {
                    fetchInstructor(json.instructorId);
                    setIsInstructor(true);
                }

                if ((!json.instructorId || json.instructorId === undefined) && (!json.traineeId || json.traineeId === undefined)) {
                    fetchCorpTrainee(json.corpTraineeId);
                    setIsCorpTrainee(true);
                }
                setRequest(json);
                fetchCourse();
            }
        }
        fetchRequest();
    }, [])

    const fetchCourse = async () => {
        const response = await fetch(`/course/${courseId}`);
        const json = await response.json();
        if (response.ok) {
            setCourse(json);
        }
    }

    const fetchCorpTrainee = async (corpTraineeId) => {
        axios
            .get(`/corptrainee/${corpTraineeId}`)
            .then((res) => {
                setCorpTrainee(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const fetchInstructor = async (instructorId) => {
        axios
            .get(`/instructor/${instructorId}`)
            .then((res) => {
                setInstructor(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const fetchTrainee = async (traineeId) => {
        axios
            .get(`/trainee/${traineeId}`)
            .then((res) => {
                setTrainee(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }


    const handleMark = async (e) => {
        e.preventDefault();
        let reportStatus = checkedOption;
        const body = { reportStatus, adminComment };
        axios
            .patch(`/report/updaterequest/${requestId}`, body)
            .then((res) => {
                setHtml("Report Information updated succesfully!");
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div>
            <div>
                {isTrainee && !isInstructor && !isCorpTrainee ? (
                    <div>
                        <h3><strong>Request Information:</strong></h3>
                        <div>
                            <p>Trainee Name: {trainee.firstName} {trainee.lastName}</p>
                            <p>Course Name: {course.courseTitle} </p>
                            <p>{trainee.firstName}'s Comments for the problem:
                                {request.traineeComments && request.traineeComments.map((comment, index1) => (
                                    <p>Comment {index1 + 1}: {comment.traineeComment}</p>
                                ))}
                            </p>
                            <p>Request Type: {request.requestType} Request</p>
                            <p>Request Status: {request.reportStatus}</p>
                            {request.adminCommment ? (<div><p>Your Reply:{request.adminCommment} </p></div>)
                                : (
                                    "You did not reply yet."
                                )}
                        </div>
                        <div>
                            <form onSubmit={handleMark}>
                                <fieldset>
                                    <label><input id='option1' type='checkbox' value="resolved" name="resolved" checked={checkedOption === "resolved"} onChange={e => { setCheckedOption(e.target.value) }} />Mark as Resolved</label>
                                </fieldset>
                                <fieldset>
                                    <label><input id='option2' type='checkbox' value="pending" name="pending" checked={checkedOption === "pending"} onChange={e => { setCheckedOption(e.target.value) }} />Mark as Pending</label>
                                </fieldset>
                                <fieldset>
                                    <label><input id='comment' type='text' value={adminComment} name='adminComment' onChange={e => { setAdminComment(e.target.value) }} />Enter a reply.</label>
                                </fieldset>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                        <p>{html}</p>
                    </div>)
                    : ('')}
            </div>

            <div>
                {!isTrainee && isInstructor && !isCorpTrainee ? (
                    <div>
                        <h3><strong>Request Information:</strong></h3>
                        <div>
                            <p>Instructor Name: {instructor.firstName} {instructor.lastName}</p>
                            <p>Course Name: {course.courseTitle} </p>
                            <p>{instructor.firstName}'s Comments for the problem:
                                {request.instructorComments && request.instructorComments.map((comment, index2) => (
                                    <p>Comment {index2 + 1}: {comment.instructorComment}</p>
                                ))}
                            </p>
                            <p>Request Type: {request.requestType} Request</p>
                            <p>Request Status: {request.reportStatus}</p>
                            {request.adminCommment ? (<div><p>Your Reply:{request.adminCommment} </p></div>)
                                : (
                                    "You did not reply yet."
                                )}
                        </div>
                        <div>
                            <form onSubmit={handleMark}>
                                <fieldset>
                                    <label><input id='option1' type='checkbox' value="resolved" name="resolved" checked={checkedOption === "resolved"} onChange={e => { setCheckedOption(e.target.value) }} />Mark as Resolved</label>
                                </fieldset>
                                <fieldset>
                                    <label><input id='option2' type='checkbox' value="pending" name="pending" checked={checkedOption === "pending"} onChange={e => { setCheckedOption(e.target.value) }} />Mark as Pending</label>
                                </fieldset>
                                <fieldset>
                                    <label><input id='comment' type='text' value={adminComment} name='adminComment' onChange={e => { setAdminComment(e.target.value) }} />Enter a reply.</label>
                                </fieldset>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                        <p>{html}</p>
                    </div>)
                    : ('')}
            </div>



            <div>
                {!isTrainee && !isInstructor && isCorpTrainee ? (
                    <div>
                        <h3><strong>Request Information:</strong></h3>
                        <div>
                            <p>Corporate Trainee Name: {corpTrainee.firstName} {corpTrainee.lastName}</p>
                            <p>Course Name: {course.courseTitle} </p>
                            <p>{corpTrainee.firstName}'s Comments for the problem:
                                {request.corpTraineeComments && request.corpTraineeComments.map((comment, index3) => (
                                    <p>Comment {index3 + 1}: {comment.corpTraineeComment}</p>
                                ))}
                            </p>
                            <p>Request Type: {request.requestType} Request</p>
                            <p>Request Status: {request.reportStatus}</p>
                            {request.adminCommment ? (<div><p>Your Reply:{request.adminCommment} </p></div>)
                                : (
                                    "You did not reply yet."
                                )}
                        </div>
                        <div>
                            <form onSubmit={handleMark}>
                                <fieldset>
                                    <label><input id='option1' type='checkbox' value="resolved" name="resolved" checked={checkedOption === "resolved"} onChange={e => { setCheckedOption(e.target.value) }} />Mark as Resolved</label>
                                </fieldset>
                                <fieldset>
                                    <label><input id='option2' type='checkbox' value="pending" name="pending" checked={checkedOption === "pending"} onChange={e => { setCheckedOption(e.target.value) }} />Mark as Pending</label>
                                </fieldset>
                                <fieldset>
                                    <label><input id='comment' type='text' value={adminComment} name='adminComment' onChange={e => { setAdminComment(e.target.value) }} />Enter a reply.</label>
                                </fieldset>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                        <p>{html}</p>
                    </div>)
                    : ('')}
            </div>
        </div>
    )
}


export default AdminProblems;