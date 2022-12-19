import { Link } from "@mui/material";
import { useState,useEffect } from "react"
//add problem attributes shown
const AdminProblems = () => {
    // //button that changes problemstate on click to resolved
    // const [problems, setProblems] = useState(null);
    // useEffect(() => {
    //     const fetchProblems = async() => {
    //         const response = await fetch('/problem');
    //         const json = await response.json();
    //         if (response.ok) {
    //             setProblems(json)
    //         }
    //     }
    //     fetchProblems();
    // }, [])
    // const handleResolved = async (e) => {
    //     e.preventDefault() //prevent form submission
    //     const response = await fetch('/problem/updateProblem ?',{
    //         method:'POST',
    //         body: JSON.stringify({problemId: e.target.value}),
    //         headers:{
    //             "Access-Control-Allow-Origin": "*",
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const json = await response.json();
    //     if (response.ok) {
    //         setProblems(json)
    //     }
    // }
    // const handlePending = async (e) => {
    //     e.preventDefault() //prevent form submission
    //     const response = await fetch('/problem/updateProblem ?',{
    //         method:'POST',
    //         body: JSON.stringify({problemId: e.target.value}),
    //         headers:{
    //             "Access-Control-Allow-Origin": "*",
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const json = await response.json();
    //     if (response.ok) {
    //         setProblems(json)
    //     }
    // }
    // return (
    //     <div className="AdminProblems">
    //         <h3>Admin Problems</h3>
    //         <div className="problem">
    //             <div className="problem-header">
    //                 <div className="problem-header__title">
    //                     <h3>Problem</h3>
    //                 </div>
    //                 <div className="problem-header__status">
    //                     <h3>Status</h3>
    //                 </div>
    //                 <div className="problem-header__resolved">
    //                     <h3>Resolved</h3>
    //                 </div>
    //             </div>
    //             {problems && problems.map((problem) => (
    //                 <div className="problem-body" key={problem.id}>
    //                     <div className="problem-body__title">
    //                         <h3>{problem.problem}</h3>
    //                     </div>
    //                     <div className="problem-body__status">
    //                         <h3>{problem.status}</h3>
    //                     </div>
    //                     <div className="problem-body__resolved">
    //                         <button value={problem.id} onClick={handleResolved}>Resolved</button>
    //                         <button value={problem.id} onClick={handlePending}>Pending</button>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
}
export default AdminProblems;