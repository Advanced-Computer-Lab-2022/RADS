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
import InstructorForgotPass from "./webcomponents/InstructorForgotPass";
import TraineeForgotPass from "./webcomponents/TraineeForgotPass";
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

const adminDrawerList = ["Profile", "Issues", "Promotion"];
const instructorDrawerList = ["Profile", "Reports", "Follow Up", "Monthly"];
const traineeDrawerList = ["Profile", "Reports", "Follow Up"];
const corpTraineeDrawerList = ["Profile", "Reports", "Follow Up"];

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
          {/* <Box className="side-bar">
            <AppNavBar
              rateValue={rateValue}
              currencyVal={inputValue}
              handleSelection={handleSelection}
              user={user}
            />
            <UserDrawer user={user} />
          </Box> */}
          {/* <Box className="home-lobby card-container">
            <h2>Welcome to RADS Online Course Provider</h2>
          </Box> */}
          <Box className="webpages">
            <Routes>
              <Route path="/userdrawer" element={<UserDrawer user={user} />} />

              <Route
                path="/noaccess"
                element={
                  <NoAccess rateVal={rateValue} currencyVal={inputValue} />
                }
              />

              <Route
                path="/corptraineereport"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeReport
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/search"
                element={
                  <SearchPage rateVal={rateValue} currencyVal={inputValue} />
                }
              />

              <Route
                path="/corptraineeviewreports"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeViewReports
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />
              <Route
                path="/corptraineefollowup"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeFollowUp
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/instructorreport"
                element={
                  <InstructorRouter user={user}>
                    <InstructorReport
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorviewreports"
                element={
                  <InstructorRouter user={user}>
                    <InstructorViewReports
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructormonthly"
                element={
                  <InstructorRouter user={user}>
                    <InstructorMonthly
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/instructorfollowup"
                element={
                  <InstructorRouter user={user}>
                    <InstructorFollowUp
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/traineereport"
                element={
                  <TraineeRouter user={user}>
                    <TraineeReport
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />
              <Route
                path="/traineeviewreports"
                element={
                  <TraineeRouter user={user}>
                    <TraineeViewReports
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />
              <Route
                path="/traineefollowup"
                element={
                  <TraineeRouter user={user}>
                    <TraineeFollowUp
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />
              <Route
                path="/traineeoptions"
                element={
                  <TraineeRouter user={user}>
                    <TraineeCreditOptions
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      token={window.localStorage.jwt}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/corptraineecourse"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeCourse
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineexam"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeExam
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineesubmitaccess"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeSubmitAccess
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineesubmitrefund"
                element={
                  <TraineeRouter user={user}>
                    <TraineeSubmitRefund
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineeprofile"
                element={
                  <TraineeRouter user={user}>
                    <Header
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      handleSelection={handleSelection}
                      user={user}
                      drawerList={adminDrawerList}
                      token={window.localStorage.jwt}
                      page="traineeprofile"
                      drawerFlag={true}
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
                      drawerFlag={true}
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
                path="/traineeoptions"
                element={
                  <TraineeRouter user={user}>
                    <TraineeCreditOptions
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineexam"
                element={
                  <TraineeRouter user={user}>
                    <TraineeExam rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineecourse"
                element={
                  <TraineeRouter user={user}>
                    <TraineeCourse
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineecredit"
                element={
                  <TraineeRouter user={user}>
                    <TraineeCreditCard
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/forgotpassinstructor/:id"
                element={
                  <InstructorRouter user={user}>
                    <InstructorForgotPass
                      ateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/forgotpasstrainee/:id"
                element={
                  <TraineeRouter user={user}>
                    <TraineeForgotPass
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/instructorrating"
                element={
                  <InstructorRouter user={user}>
                    <InstructorRating
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </InstructorRouter>
                }
              />

              <Route
                path="/corptraineerating"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeRating
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineesolve"
                element={
                  <TraineeRouter user={user}>
                    <TraineeSolve
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/corptraineesolve"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeSolve
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineerate"
                element={
                  <TraineeRouter user={user}>
                    <TraineeRating
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineeview"
                element={
                  <TraineeRouter user={user}>
                    <TraineeView rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/traineeform"
                element={
                  <TraineeRouter user={user}>
                    <TraineeForm rateVal={rateValue} currencyVal={inputValue} />
                  </TraineeRouter>
                }
              />

              <Route
                path="/instructorlobby"
                element={
                  <InstructorRouter user={user}>
                    <InstructorLobby
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      token={window.localStorage.jwt}
                    />
                  </InstructorRouter>
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
                  </AdminRouter>
                }
              />

              <Route
                path="/filter"
                element={
                  <CourseView rateVal={rateValue} currencyVal={inputValue} />
                }
              />

              <Route
                path="/corptraineeview"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeView
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineelobby"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeLobby
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      token={window.localStorage.jwt}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/corptraineeform"
                element={
                  <CorpTraineeRouter user={user}>
                    <CorpTraineeForm
                      rateVal={rateValue}
                      currencyVal={inputValue}
                    />
                  </CorpTraineeRouter>
                }
              />

              <Route
                path="/traineelobby"
                element={
                  <TraineeRouter user={user}>
                    <TraineeLobby
                      rateVal={rateValue}
                      currencyVal={inputValue}
                      token={window.localStorage.jwt}
                    />
                  </TraineeRouter>
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
