import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Navbar from "./Navbar";
import Admin from "../webpages/Admin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ErrorIcon from "@mui/icons-material/Error";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PercentIcon from "@mui/icons-material/Percent";
import PaidIcon from "@mui/icons-material/Paid";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { ExpandMore, PersonAddAlt1 } from "@mui/icons-material";
import jwt_decode from "jwt-decode";
import AdminReports from "./AdminReports";
import AdminPromotion from "./AdminPromotion";
import AdminRefund from "./AdminRefund";
import AdminProblems from "./AdminProblems";
import CorpTraineeInsert from "./CorpTraineeInsert";
import AdminAccess from "./AdminAccess";
import NewAdminButton from "./NewAdminButton";
import InstructorForm from "./InstructorForm";
import TraineeDetails from "./TraineeDetails";
import TraineeExam from "./TraineeExam";
import TraineeReport from "./TraineeReport";
import TraineeViewReports from "./TraineeViewReports";
import TraineeCreditOptions from "./TraineeCreditOptions";
import TraineeSubmitRefund from "./TraineeSubmitRefund";
import TraineeCourse from "./TraineeCourse";
import TraineeLobby from "../webpages/TraineeLobby";
import InstructorLobby from "../webpages/InstructorLobby";
import TraineeForm from "./TraineeForm";
import TraineeView from "./TraineeView";
import TraineeRating from "./TraineeRating";
import TraineeSolve from "./TraineeSolve";
import TraineeFollowUp from "./TraineeFollowUp";
import TraineeCreditCard from "./TraineeCreditCard";
import CorpTraineeLobby from "../webpages/CorpTraineeLobby";
import CorpTraineeFollowUp from "./CorpTraineeFollowUp";
import CorpTraineeSubmitAccess from "./CorpTraineeSubmitAccess";
import CorpTraineeViewReports from "./CorpTraineeViewReports";
import CorpTraineeReport from "./CorpTraineeReport";
import CorpTraineeExam from "./CorpTraineeExam";
import CorpTraineeCourse from "./CorpTraineeCourse";
import CorpTraineeSolve from "./CorpTraineeSolve";
import CorpTraineeRating from "./CorpTraineeRating";
import CorpTraineeView from "./CorpTraineeView";
import CorpTraineeForm from "./CorpTraineeForm";

const drawerWidth = 240;


const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const { user, drawerList, rateVal, currencyVal, token, page, subpage, drawerFlag } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const decode = jwt_decode(token);
  const adminId = decode.id;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    drawerFlag ? handleDrawerOpen() : handleDrawerClose()

  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        indicatorColor="primary"
        style={{ marginTop: "5.3rem" }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Navbar user={user} />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Accordion>
          <List>
            {drawerList.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {user.role === "ADMIN" ? (
                      index === 0 ? (
                        <AccountCircleIcon />
                      ) : index === 1 ? (
                        <ReportProblemIcon />
                      ) : index === 2 ? (
                        <PercentIcon />
                      ) : (
                        <InboxIcon />
                      )
                    ) : user.role === "TRAINEE" ? (
                      index === 0 ? (
                        <AccountCircleIcon />
                      ) : index === 1 ? (
                        <ReportProblemIcon />
                      ) : index === 2 ? (
                        <PercentIcon />
                      ) : (
                        <InboxIcon />
                      )
                    ) : user.role === "CORP_TRAINEE" ? (
                      index === 0 ? (
                        <AccountCircleIcon />
                      ) : index === 1 ? (
                        <ReportProblemIcon />
                      ) : index === 2 ? (
                        <PercentIcon />
                      ) : (
                        <InboxIcon />
                      )
                    ) : user.role === "INSTRUCTOR" ? (
                      index === 0 ? (
                        <AccountCircleIcon />
                      ) : index === 1 ? (
                        <ReportProblemIcon />
                      ) : index === 2 ? (
                        <PercentIcon />
                      ) : (
                        <InboxIcon />
                      )
                    ) : (
                      <></>
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    onClick={
                      user.role === "ADMIN" ? (
                        index === 0 ? (
                          () =>
                            (window.location.href = `/adminprofile?adminId=${adminId}`)
                        ) : index === 1 ? (
                          () =>
                            (window.location.href = `/adminreports?adminId=${adminId}`)
                        ) : index === 2 ? (
                          () =>
                            (window.location.href = `/adminpromotion?adminId=${adminId}`)
                        ) : (
                          <></>
                        )
                      ) : user.role === "TRAINEE" ? (
                        index === 0 ? (
                          () =>
                            (window.location.href = `/traineeprofile?traineeId=${adminId}`)
                        ) : index === 1 ? (
                          () =>
                            (window.location.href = `/adminreports?adminId=${adminId}`)
                        ) : index === 2 ? (
                          () =>
                            (window.location.href = `/adminpromotion?adminId=${adminId}`)
                        ) : (
                          <></>
                        )
                      ) : user.role === "CORP_TRAINEE" ? (
                        index === 0 ? (
                          () =>
                            (window.location.href = `/traineeprofile?traineeId=${adminId}`)
                        ) : index === 1 ? (
                          () =>
                            (window.location.href = `/adminreports?adminId=${adminId}`)
                        ) : index === 2 ? (
                          () =>
                            (window.location.href = `/adminpromotion?adminId=${adminId}`)
                        ) : (
                          <></>
                        )
                      ) : user.role === "INSTRUCTOR" ? (
                        index === 0 ? (
                          () =>
                            (window.location.href = `/instructorprofile?instructorId=${adminId}`)
                        ) : index === 1 ? (
                          () =>
                            (window.location.href = `/adminreports?adminId=${adminId}`)
                        ) : index === 2 ? (
                          () =>
                            (window.location.href = `/adminpromotion?adminId=${adminId}`)
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Accordion>
        <Divider />
        <List>
          {["Add Admin", "Add Corprate Trainee", "Add Instructor"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {user.role === "ADMIN" ? (
                      index === 0 ? (
                        <PersonAddAlt1 />
                      ) : index === 1 ? (
                        <PersonAddAlt1 />
                      ) : (
                        <PersonAddAlt1 />
                      )
                    ) : user.role === "TRAINEE" ? (
                      index === 0 ? (
                        <AccountCircleIcon />
                      ) : index === 1 ? (
                        <MailIcon />
                      ) : (
                        <InboxIcon />
                      )
                    ) : user.role === "CORP_TRAINEE" ? (
                      index === 0 ? (
                        <AccountCircleIcon />
                      ) : index === 1 ? (
                        <MailIcon />
                      ) : (
                        <InboxIcon />
                      )
                    ) : user.role === "INSTRUCTOR" ? (
                      index === 0 ? (
                        <AccountCircleIcon />
                      ) : index === 1 ? (
                        <MailIcon />
                      ) : (
                        <InboxIcon />
                      )
                    ) : (
                      <></>
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    onClick={
                      user.role === "ADMIN" ? (
                        index === 0 ? (
                          () =>
                            (window.location.href = `/adminadd?adminId=${adminId}`)
                        ) : index === 1 ? (
                          () =>
                            (window.location.href = `/admininsertcorp?adminId=${adminId}`)
                        ) : index === 2 ? (
                          () =>
                            (window.location.href = `/admininstructoradd?adminId=${adminId}`)
                        ) : (
                          <></>
                        )
                      ) : user.role === "TRAINEE" ? (
                        index === 0 ? (
                          () =>
                            (window.location.href = `/traineeprofile?adminId=${adminId}`)
                        ) : index === 1 ? (
                          () =>
                            (window.location.href = `/adminreports?adminId=${adminId}`)
                        ) : index === 2 ? (
                          () =>
                            (window.location.href = `/adminpromotion?adminId=${adminId}`)
                        ) : (
                          <></>
                        )
                      ) : user.role === "CORP_TRAINEE" ? (
                        index === 0 ? (
                          () =>
                            (window.location.href = `/corptraineeprofile?adminId=${adminId}`)
                        ) : index === 1 ? (
                          () =>
                            (window.location.href = `/adminreports?adminId=${adminId}`)
                        ) : index === 2 ? (
                          () =>
                            (window.location.href = `/adminpromotion?adminId=${adminId}`)
                        ) : (
                          <></>
                        )
                      ) : user.role === "INSTRUCTOR" ? (
                        index === 0 ? (
                          () =>
                            (window.location.href = `/instructorprofile?adminId=${adminId}`)
                        ) : index === 1 ? (
                          () =>
                            (window.location.href = `/adminreports?adminId=${adminId}`)
                        ) : index === 2 ? (
                          () =>
                            (window.location.href = `/adminpromotion?adminId=${adminId}`)
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box>
          {user.role === "ADMIN" ? (
            page === "adminreports" ? (
              <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "adminProfile" ? (
              ///////////////////////////////////////////////
              <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "adminrefunds" ? (
              <AdminRefund rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "adminadd" ? (
              <NewAdminButton
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "admininsertcorp" ? (
              <CorpTraineeInsert
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "admininstructoradd" ? (
              <InstructorForm
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "subadmin" ? (
              subpage === "adminproblems" ? (
                <AdminProblems rateVal={rateVal} currencyVal={currencyVal} />
              ) : subpage === "adminrefunds" ? (
                <AdminRefund rateVal={rateVal} currencyVal={currencyVal} />
              ) : subpage === "admininsertcorp" ? (
                <CorpTraineeInsert
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                />
              ) : subpage === "adminaccess" ? (
                <AdminAccess rateVal={rateVal} currencyVal={currencyVal} />
              ) : (
                <> </>
              )
            ) : page === "adminpromotion" ? (
              <AdminPromotion rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "null" ? (
              <></>
            ) : (
              <Admin
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            )
          ) : user.role === "TRAINEE" ? (
            page === "adminreports" ? (
              <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "traineeProfile" ? (
              ///////////////////////////////////////////////
              <TraineeDetails />
            ) : page === "adminrefunds" ? (
              <AdminRefund rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "adminadd" ? (
              <NewAdminButton
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "admininsertcorp" ? (
              <CorpTraineeInsert
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "admininstructoradd" ? (
              <InstructorForm
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "subtrainee" ? (
              subpage === "traineesubmitrefund" ? (
                <TraineeSubmitRefund
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                />
              ) : subpage === "traineeoptions" ? (
                <TraineeCreditOptions
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineefollowup" ? (
                <TraineeFollowUp rateVal={rateVal} currencyVal={currencyVal} />
              ) : subpage === "traineeviewreports" ? (
                <TraineeViewReports
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                />
              ) : subpage === "traineereport" ? (
                <TraineeReport
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineexam" ? (
                <TraineeExam
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineecourse" ? (
                <TraineeCourse
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineecredit" ? (
                <TraineeCreditCard
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineesolve" ? (
                <TraineeSolve
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineerate" ? (
                <TraineeRating
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineeview" ? (
                <TraineeView
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineeform" ? (
                <TraineeForm
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : (
                <> </>
              )
            ) : page === "adminpromotion" ? (
              <AdminPromotion rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "null" ? (
              <></>
            ) : (
              <TraineeLobby
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            )
          ) : user.role === "CORP_TRAINEE" ? (
            page === "adminreports" ? (
              <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "corpTraineeProfile" ? (
              ///////////////////////////////////////////////
              <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "adminrefunds" ? (
              <AdminRefund rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "adminadd" ? (
              <NewAdminButton
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "admininsertcorp" ? (
              <CorpTraineeInsert
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "admininstructoradd" ? (
              <InstructorForm
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "subcorptrainee" ? (
              subpage === "corptraineesubmitaccess" ? (
                <CorpTraineeSubmitAccess
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                />
              ) : subpage === "corptraineefollowup" ? (
                <CorpTraineeFollowUp
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                />
              ) : subpage === "corptraineeviewreports" ? (
                <CorpTraineeViewReports
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                />
              ) : subpage === "corptraineereport" ? (
                <CorpTraineeReport
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "corptraineexam" ? (
                <CorpTraineeExam
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "corptraineecourse" ? (
                <CorpTraineeCourse
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "corptraineesolve" ? (
                <CorpTraineeSolve
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "corptraineerating" ? (
                <CorpTraineeRating
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "corptraineeview" ? (
                <CorpTraineeView
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "corptraineeform" ? (
                <CorpTraineeForm
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : (
                <> </>
              )
            ) : page === "adminpromotion" ? (
              <AdminPromotion rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "null" ? (
              <></>
            ) : (
              <CorpTraineeLobby
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            )
          ) : user.role === "INSTRUCTOR" ? (
            page === "adminreports" ? (
              <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "instructorProfile" ? (
              ///////////////////////////////////////////////
              <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "adminrefunds" ? (
              <AdminRefund rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "adminadd" ? (
              <NewAdminButton
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "admininsertcorp" ? (
              <CorpTraineeInsert
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "admininstructoradd" ? (
              <InstructorForm
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            ) : page === "subinstructor" ? (
              subpage === "traineesubmitrefund" ? (
                <TraineeSubmitRefund
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                />
              ) : subpage === "traineeoptions" ? (
                <TraineeCreditOptions
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineefollowup" ? (
                <TraineeFollowUp rateVal={rateVal} currencyVal={currencyVal} />
              ) : subpage === "traineeviewreports" ? (
                <TraineeViewReports
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                />
              ) : subpage === "traineereport" ? (
                <TraineeReport
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineexam" ? (
                <TraineeExam
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineecourse" ? (
                <TraineeCourse
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineecredit" ? (
                <TraineeCreditCard
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineesolve" ? (
                <TraineeSolve
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineerate" ? (
                <TraineeRating
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineeview" ? (
                <TraineeView
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : subpage === "traineeform" ? (
                <TraineeForm
                  rateVal={rateVal}
                  currencyVal={currencyVal}
                  token={token}
                />
              ) : (
                <> </>
              )
            ) : page === "adminpromotion" ? (
              <AdminPromotion rateVal={rateVal} currencyVal={currencyVal} />
            ) : page === "null" ? (
              <></>
            ) : (
              <InstructorLobby
                rateVal={rateVal}
                currencyVal={currencyVal}
                token={token}
              />
            )
          ) : (
            <></>
          )}
        </Box>
      </Main>
    </Box>
  );
}
