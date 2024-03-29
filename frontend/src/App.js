import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./webcomponents/Navbar";
import InstructorLobby from "./webpages/InstructorLobby";
import TraineeLobby from "./webpages/TraineeLobby";
import Contract from "./webpages/Contract";
import Home from "./webpages/Home";
import Admin from "./webpages/Admin";
import CorpTraineeLobby from "./webpages/CorpTraineeLobby";
//import TraineeLobby from './webpages/TraineeLobby';
import CourseView from "./webcomponents/CourseView";
import * as React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import InstructorRating from "./webcomponents/InstructorRating";
import CorpTraineeView from "./webcomponents/CorpTraineeView";
import CorpTraineeForm from "./webcomponents/CorpTraineeForm";
import CorpTraineeSolve from "./webcomponents/CorpTraineeSolve";
import TraineeView from "./webcomponents/TraineeView";
import TraineeForm from "./webcomponents/TraineeForm";
import TraineeRating from "./webcomponents/TraineeRating";
import TraineeSolve from "./webcomponents/TraineeSolve";
import TraineeCreditCard from "./webcomponents/TraineeCreditCard";
import TraineeCreditOptions from "./webcomponents/TraineeCreditOptions";
import TraineeCourse from "./webcomponents/TraineeCourse";
import TraineeExam from "./webcomponents/TraineeExam";
import AdminRefund from "./webcomponents/AdminRefund";
import AdminAccess from "./webcomponents/AdminAccess";
import AdminReports from "./webcomponents/AdminReports";
import TraineeSubmitRefund from "./webcomponents/TraineeSubmitRefund";
import CorpTraineeExam from "./webcomponents/CorpTraineeExam";
import CorpTraineeSubmitAccess from "./webcomponents/CorpTraineeSubmitAccess";
import CorpTraineeCourse from "./webcomponents/CorpTraineeCourse";
import CorpTraineeRating from "./webcomponents/CorpTraineeRating";
import SignUp from "./webpages/SignUp";
import LogIn from "./webpages/LogIn";
import NotFound from "./webpages/NotFound";
import NoAccess from "./webpages/NoAccess";
import AdminRouter from "./webcomponents/AdminRouter";
import TraineeRouter from "./webcomponents/TraineeRouter";
import CorpTraineeRouter from "./webcomponents/CorpTraineeRouter";
import InstructorRouter from "./webcomponents/InstructorRouter";
import ForceRedirect from "./webcomponents/ForceRedirect";
import { Logout, setUser } from "./redux/actions/authActions";
import { setAuth } from "./util/setAuth";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import TraineeReport from "./webcomponents/TraineeReport";
import TraineeViewReports from "./webcomponents/TraineeViewReports";
import CorpTraineeReport from "./webcomponents/CorpTraineeReport";
import CorpTraineeViewReports from "./webcomponents/CorpTraineeViewReports";
import InstructorReport from "./webcomponents/InstructorReport";
import InstructorViewReports from "./webcomponents/InstructorViewReports";
import TraineeFollowUp from "./webcomponents/TraineeFollowUp";
import CorpTraineeFollowUp from "./webcomponents/CorpTraineeFollowUp";
import InstructorFollowUp from "./webcomponents/InstructorFollowUp";
import AppNavBar from "./webcomponents/AppNavBar";
import InstructorMonthly from "./webcomponents/InstructorMonthly";
import CorpTraineeInsert from "./webcomponents/CorpTraineeInsert";
import AdminProblems from "./webcomponents/AdminProblems";
import AdminPromotion from "./webcomponents/AdminPromotion";
import SearchPage from "./webcomponents/SearchPage";
import UserDrawer from "./webcomponents/UserDrawer";
import Header from "./webcomponents/Header";
import Footer from "./webcomponents/Footer";
import About from "./webcomponents/About";
import TraineeDetails from "./webcomponents/TraineeDetails";
import ForgetPassword from "./webpages/ForgetPassword";
import ChangePassword from "./webpages/ChangePassword";
import InstructorView from "./webcomponents/InstructorView";

const adminDrawerList = ["Profile", "Issues", "Promotion"];
const instructorDrawerList = ["Profile", "My Courses", "Promotion"];
const traineeDrawerList = ["Profile", "My Courses", "Reports"];
const corpTraineeDrawerList = ["Profile", "My Courses", "Reports"];

if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
  const currentDate = Date.now / 1000;
  if (decode.exp > currentDate) {
    store.dispatch(Logout());
  }
}

function App() {
  const url = "https://api.exchangerate.host/convert?from=USD&to=";
  const [rateValue, setRateValue] = useState(1);
  const [inputValue, setInputValue] = useState("USD");
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
  };

  const fetchCurrencyRate = async (val) => {
    console.log("Val", val);
    const response = await fetch(url + val);
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      setRateValue(json.result);
      console.log(json.result);
    }
  };

  //a function that handles the selection of the currency
  const handleSelection = (inputValue) => {
    console.log("inputValue", inputValue);
    setInputValue(inputValue);
    fetchCurrencyRate(inputValue);
  };
  return (
    <Box className="App">
      <BrowserRouter>
        <Box className="bg-light" style={{ height: "100vh" }}>
          <Box className="webpages">
            <Routes>
              <Route
                path="/instructorreport"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="subinstructor"
                      subpage="instructorreport"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorviewreports"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="subinstructor"
                      subpage="instructorviewreports"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructormonthly"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="subinstructor"
                      subpage="instructormonthly"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorfollowup"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="subinstructor"
                      subpage="instructorfollowup"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorrating"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="subinstructor"
                      subpage="instructorrating"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorpromotion"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="instructorpromotion"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorlobby"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      className="header"
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorprofile"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="instructorprofile"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/coursecreate"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="coursecreate"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorupdateinfo"
                element={
                  <InstructorRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={instructorDrawerList}
                      token={window.localStorage.jwt}
                      page="instructorupdateinfo"
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorview"
                element={
                  <Header
                    rateVal={rateValue}
                    currencyVal={inputValue}
                    handleSelection={handleSelection}
                    user={user}
                    drawerList={instructorDrawerList}
                    token={window.localStorage.jwt}
                    page="subinstructor"
                    subpage="instructorview"
                  />
                }
              />

              <Route
                path="/instructorcourseform"
                element={
                  <Header
                    rateVal={rateValue}
                    currencyVal={inputValue}
                    handleSelection={handleSelection}
                    user={user}
                    drawerList={instructorDrawerList}
                    token={window.localStorage.jwt}
                    page="instructorcourseform"
                  />
                }
              />

              <Route
                path="/corptraineecourse"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineecourse"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineereport"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineereport"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineeviewreports"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineeviewreports"
                    />
                  </CorpTraineeRouter>
                }
              />
              <Route
                path="/corptraineefollowup"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineefollowup"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineexam"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineexam"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineesubmitaccess"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineesubmitaccess"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineeview"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineeview"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineesolve"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineesolve"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineerating"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineerating"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineelobby"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      className="header"
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineeform"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subcorptrainee"
                      subpage="corptraineeform"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corpTraineeProfile"
                element={
                  <CorpTraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={corpTraineeDrawerList}
                      token={window.localStorage.jwt}
                      page="corpTraineeProfile"
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineereport"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineereport"
                    />
                  </TraineeRouter>
                }
              />
              <Route
                path="/traineeviewreports"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineeviewreports"
                    />
                  </TraineeRouter>
                }
              />
              <Route
                path="/traineefollowup"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineefollowup"
                    />
                  </TraineeRouter>
                }
              />
              <Route
                path="/traineeoptions"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineeoptions"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineesubmitrefund"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineesubmitrefund"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineeProfile"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="traineeProfile"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineexam"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineexam"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineecourse"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineecourse"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineecredit"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineecredit"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/forgotpasstrainee/:id"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="forgotpasstrainee/:id"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineesolve"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineesolve"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineerate"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineerate"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineeview"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineeview"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineeform"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                      page="subtrainee"
                      subpage="traineeform"
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineelobby"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      className="header"
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={traineeDrawerList}
                      token={window.localStorage.jwt}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/adminreports"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="adminreports"
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminprofile"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="adminprofile"
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminproblems"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="subadmin"
                      subpage="adminproblems"
                      drawerFlag={true}
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminpromotion"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="adminpromotion"
                      drawerFlag={true}
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminadd"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="adminadd"
                      drawerFlag={true}
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/admininstructoradd"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="admininstructoradd"
                      drawerFlag={true}
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/admininsertcorp"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="admininsertcorp"
                      drawerFlag={true}
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminrefunds"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="subadmin"
                      subpage="adminrefunds"
                      drawerFlag={true}
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminaccess"
                element={
                  <AdminRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="subadmin"
                      subpage="adminaccess"
                      drawerFlag={true}
                    />
                  </AdminRouter>
                }
              />

              <Route
                path="/adminlobby"
                element={
                  <AdminRouter user={user}>
                    <Header
                      className="header"
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                    />
                    <Footer />
                  </AdminRouter>
                }
              />

              <Route path="/userdrawer" element={<UserDrawer user={user} />} />

              <Route
                path="/noaccess"
                element={
                  <Box>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <NoAccess rateVal={rateValue} currencyVal={inputValue} />
                  </Box>
                }
              />

              <Route
                path="/search"
                element={
                  <SearchPage rateVal={rateValue} currencyVal={inputValue} />
                }
              />

              <Route
                path="/filter"
                element={
                  <Box>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <CourseView
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                  </Box>
                }
              />

              <Route
                path="/"
                element={
                  <Box>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <Box className="home-lobby card-container">
                      <h2>Welcome to RADS Online Course Provider</h2>
                    </Box>
                    <Home rateVal={rateValue} currencyVal={inputValue} />
                  </Box>
                }
              />

              <Route
                path="/home"
                element={
                  <Box>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <Box className="home-lobby card-container">
                      <h2>Welcome to RADS Online Course Provider</h2>
                    </Box>
                    <Home rateVal={rateValue} currencyVal={inputValue} />
                  </Box>
                }
              />

              <Route
                path="/login"
                element={
                  <ForceRedirect user={user}>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <LogIn rateVal={rateValue} currencyVal={inputValue} />
                  </ForceRedirect>
                }
              />

              <Route
                path="/forgotpass"
                element={
                  <ForceRedirect user={user}>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <ForgetPassword
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </ForceRedirect>
                }
              />

              <Route
                path="/changepass/:id"
                element={
                  <ForceRedirect user={user}>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <ChangePassword
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </ForceRedirect>
                }
              />

              <Route
                path="/signup"
                element={
                  <ForceRedirect user={user}>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <SignUp rateVal={rateValue} currencyVal={inputValue} />
                  </ForceRedirect>
                }
              />

              <Route
                path="/about"
                element={
                  <Box>
                    <AppNavBar
                      rateValue={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      token={window.localStorage.jwt}
                    />
                    <Navbar user={user} />
                    <About />
                  </Box>
                }
              />

              <Route
                path="/contract"
                element={
                  <Contract rateVal={rateValue} currencyVal={inputValue} />
                }
              />

              <Route
                path="*"
                element={
                  <NotFound rateVal={rateValue} currencyVal={inputValue} />
                }
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
