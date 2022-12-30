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
import { ExpandMore } from "@mui/icons-material";
import jwt_decode from "jwt-decode";
import AdminReports from "./AdminReports";
import AdminPromotion from "./AdminPromotion";
import AdminRefund from "./AdminRefund";
import AdminProblems from "./AdminProblems";
import CorpTraineeInsert from "./CorpTraineeInsert";
import AdminAccess from "./AdminAccess";

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
        style={{ marginTop: "5rem" }}
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
                    {index === 0 ? (
                      <AccountCircleIcon />
                    ) : index === 1 ? (
                      <ReportProblemIcon />
                    ) : index === 2 ? (
                      <PercentIcon />
                    ) : (
                      <InboxIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    onClick={
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
                        <InboxIcon />
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
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? (
                    <AccountCircleIcon />
                  ) : index === 1 ? (
                    <MailIcon />
                  ) : (
                    <InboxIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box>
          {page === "adminreports" ? (
            <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
          ) : page === "adminProfile" ? (
            ///////////////////////////////////////////////
            <AdminReports rateVal={rateVal} currencyVal={currencyVal} />
          ) : page === "adminrefunds" ? (
            <AdminRefund rateVal={rateVal} currencyVal={currencyVal} />
          ) : page === "subadmin" ? (
            subpage === "adminproblems" ? (
              <AdminProblems rateVal={rateVal} currencyVal={currencyVal} />
            ) : subpage === "adminrefunds" ? (
              <AdminRefund rateVal={rateVal} currencyVal={currencyVal} />
            ) : subpage === "admininsertcorp" ? (
              <CorpTraineeInsert rateVal={rateVal} currencyVal={currencyVal} />
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
            <Admin rateVal={rateVal} currencyVal={currencyVal} token={token} />
          )}
        </Box>
      </Main>
    </Box>
  );
}

// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ImportContactsIcon from "@mui/icons-material/ImportContacts";
// import WalletIcon from "@mui/icons-material/Wallet";
// import PaidIcon from "@mui/icons-material/Paid";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
// import HelpIcon from "@mui/icons-material/Help";
// import InfoIcon from "@mui/icons-material/Info";
// import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import Collapse from "@mui/material/Collapse";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import React from "react";
// import { useState } from "react";

// const UserDrawer = () => {
//   const drawerWidth = 240;

//   const openedMixin = (theme) => ({
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     overflowX: "hidden",
//   });

//   const closedMixin = (theme) => ({
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: "hidden",
//     width: `calc(${theme.spacing(7)} + 1px)`,
//     [theme.breakpoints.up("sm")]: {
//       width: `calc(${theme.spacing(8)} + 1px)`,
//     },
//   });

//   const DrawerHeader = styled("div")(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   }));

//   const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "open",
//   })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     }),
//   }));

//   const Drawer = styled(MuiDrawer, {
//     shouldForwardProp: (prop) => prop !== "open",
//   })(({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//     boxSizing: "border-box",
//     ...(open && {
//       ...openedMixin(theme),
//       "& .MuiDrawer-paper": openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       "& .MuiDrawer-paper": closedMixin(theme),
//     }),
//   }));

//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [dic, setdic] = useState("ltr");

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//     return (
//         <div>
//   <Box sx={{ display: "flex" }}>
//     <CssBaseline />
//     {/* <AppBar className='mt-5' position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             onClick={handleDrawerOpen}
//           >
//             <MenuIcon />
//           </IconButton>

//         </Toolbar>
//       </AppBar> */}
//     <Drawer
//       variant="permanent"
//       open={open}
//       onClick={() => {
//         if (open) setdic("ltr");
//         else setdic("rtl");
//         setOpen(!open);
//       }}
//     >
//       <DrawerHeader>
//         <IconButton onClick={handleDrawerClose}>
//           {dic === "ltr" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//         </IconButton>
//       </DrawerHeader>

//       <Divider />

//       <List>
//         {[
//           "Profile",
//           "My Courses",
//           "Wallet",
//           "Refund",
//           "Settings",
//           "Policy&Privacy",
//           "Help",
//           "Log Out",
//         ].map((text, index) => (
//           <ListItem key={text} disablePadding sx={{ display: "block" }}>
//             <ListItemButton
//               sx={{
//                 maxHeight: 200,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 {index % 8 === 0 ? (
//                   <AccountCircleIcon />
//                 ) : index % 8 === 1 ? (
//                   <ImportContactsIcon />
//                 ) : index % 8 === 2 ? (
//                   <WalletIcon />
//                 ) : index % 8 === 3 ? (
//                   <PaidIcon />
//                 ) : index % 8 === 4 ? (
//                   <SettingsApplicationsIcon />
//                 ) : index % 8 === 5 ? (
//                   <PrivacyTipIcon />
//                 ) : index % 8 === 6 ? (
//                   <HelpIcon />
//                 ) : (
//                   <ExitToAppIcon />
//                 )}
//               </ListItemIcon>

//               <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       {/* for courses */}
//     </Drawer>
//     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//       <DrawerHeader />
//     </Box>
//   </Box>
// </div>
//      );
// }

// export default UserDrawer;
