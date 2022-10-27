import {Link } from 'react-router-dom'
import CountriesSelect from './CountriesComboBox'

const Navbar = () =>{
    return(
        <header>
            <div className="container">
              <Link to="/">
                <h1>website</h1>
              </Link>
              <CountriesSelect />
            </div>
        </header>
    )
}


export default Navbar