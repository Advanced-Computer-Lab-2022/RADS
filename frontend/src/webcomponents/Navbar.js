import {Link } from 'react-router-dom'

const Navbar = () =>{
    return(
      <div>
        <div className='topbar'></div>
        <header>
            <div className="nav-container">
              <Link to="/">
                <h1>Home</h1>
              </Link>
              <Link to="/instructorlobby">
                <h1>Instructor Lobby</h1>
              </Link>
              <Link to="/adminlobby">
                <h1>Admin Lobby</h1>
              </Link>
              <Link to="/corptraineelobby">
                <h1>Corporate trainee Lobby</h1>
              </Link>
              <Link to="/traineelobby">
                <h1>Trainee Lobby</h1>
              </Link>
              <Link to="/contract">
                <h1>Contract</h1>
              </Link>
            </div>
        </header>
        </div>
    )
}


export default Navbar