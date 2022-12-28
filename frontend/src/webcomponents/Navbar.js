import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../redux/actions/authActions";
import { Box } from "@mui/material";

function Navbar({ user }) {
  const dispatch = useDispatch()
  const LogoutHanlder = ()=>{
     dispatch(Logout())
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Box className="container-fluid navbar">
        {!user.isConnected ? (
          <>
            <Link to="/">
              Home
            </Link>
          </>
        ) : (
          <Link to="/home">
            RADS
          </Link>
        )}
        <Box className="collapse navbar-collapse" id="navbarSupportedContent">
          <Box className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "ADMIN" ? (
              <>
                <Link className="nav-link active" aria-current="page" to="/adminlobby">
                  Admin Lobby
                </Link>
              </>
            ) : (
              ""
            )}
          </Box>
          <Box className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "TRAINEE" ? (
              <>
                <Link className="nav-link active" aria-current="page" to="/traineelobby">
                  Trainee Lobby
                </Link>
              </>
            ) : (
              ""
            )}
          </Box>
          <Box className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "INSTRUCTOR" ? (
              <>
                <Link className="nav-link active" aria-current="page" to="/instructorlobby">
                  Instructor Lobby
                </Link>
              </>
            ) : (
              ""
            )}
          </Box>
          <Box className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "CORP_TRAINEE" ? (
              <>
                <Link className="nav-link active" aria-current="page" to="/corptraineelobby">
                  Corprate Trainee Lobby
                </Link>
              </>
            ) : (
              ""
            )}
          </Box>
          <Box className="d-flex">
            <Box className="mx-4">
              {
                !user.isConnected ? (
                  <>
                    <Link className="btn btn-outline-primary" to="/login">
                      Login
                    </Link>
                    <Link className="btn btn-outline-primary" to="/signup">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <Link className="btn btn-outline-primary" to="#" onClick={LogoutHanlder}>
                    Logout
                  </Link>
                )
              }
            </Box>
          </Box>
        </Box>
      </Box>
    </nav>
  );
}

export default Navbar;