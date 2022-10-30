import {Link } from 'react-router-dom'

const Navbar = () =>{
    return(
        <header>
            <div className="container">
              <Link to="/">
                <h1>Home</h1>
              </Link>
              <Link to="/instructorlobby">
                <h1>Instructor Lobby</h1>
              </Link>
              <Link to="/adminlobby">
                <h1>Admin Lobby</h1>
              </Link>
            </div>
        </header>
    )
}


export default Navbar