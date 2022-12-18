import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import { Logout } from "../redux/actions/authActions";

function Navbar({ user }) {
  //const dispatch = useDispatch()
  // const LogoutHanlder = ()=>{
  //    dispatch(Logout())
  // }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        { !user.isConnected ? (
          <>
            <Link to="/login">
              RADS
            </Link>
          </>
        ) : (
          <Link to="/home">
            RADS
          </Link>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "ADMIN" ? (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/adminlobby">
                  Admin Lobby
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "TRAINEE" ? (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/traineelobby">
                  Trainee Lobby
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "INSTRUCTOR" ? (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/instructorlobby">
                  Instructor Lobby
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "CORP_TRAINEE" ? (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/corptraineelobby">
                  Corprate Trainee Lobby
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <div className="d-flex">
            <div className="mx-4">
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
                  <Link className="btn btn-outline-primary" to="#" onClick={{/*LogoutHanlder*/ }}>
                    Logout
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;