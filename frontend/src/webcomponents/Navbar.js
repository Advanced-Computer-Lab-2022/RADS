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
    <nav className="navbar">
        {!user.isConnected ? (
          <></>
        ) : (
          <></>
        )}
            {user.role === "ADMIN" ? (
              <>
                <Link className="nav-link active" aria-current="page" to="/adminlobby">
                  Admin Lobby
                </Link>
              </>
            ) : (
              ""
            )}
            {user.role === "TRAINEE" ? (
              <>
                <Link className="nav-link active" aria-current="page" to="/traineelobby">
                  Trainee Lobby
                </Link>
              </>
            ) : (
              ""
            )}
            {user.role === "INSTRUCTOR" ? (
              <>
                <Link className="nav-link active" aria-current="page" to="/instructorlobby">
                  Instructor Lobby
                </Link>
              </>
            ) : (
              ""
            )}
            {user.role === "CORP_TRAINEE" ? (
              <>
                <Link className="nav-link active" aria-current="page" to="/corptraineelobby">
                  Corprate Trainee Lobby
                </Link>
              </>
            ) : (
              ""
            )}
              {
                !user.isConnected ? (
                  <>
                  </>
                ) : (
                  <Link className="btn btn-outline-primary" to="#" onClick={LogoutHanlder}>
                    Logout
                  </Link>
                )
              }
    </nav>
  );
}

export default Navbar;