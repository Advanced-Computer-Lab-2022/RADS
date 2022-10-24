import{BrowserRouter, Routes, Route} from 'react-router-dom'

// webpages
import Home from './webpages/Home'


function App() {
    return ( 
        <div className = "App" >
          <BrowserRouter>
           <div className='webpages'>
            <Routes>
              <Route 
                path = "/"
                element = {<Home/>}
              />
            </Routes>

           </div>
          </BrowserRouter>
        </div>
    );
}

export default App;