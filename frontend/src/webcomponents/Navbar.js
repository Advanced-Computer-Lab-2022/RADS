import {Link } from 'react-router-dom'

const Navbar = () =>{
    return(
        <header>
            <div className="container">
              <Link to="/">
                <h1>website</h1>
              </Link>
              <Link to="/instructor">
                <h2>List of instructor</h2>
              </Link>
            </div>
        </header>
    )
}


export default Navbar