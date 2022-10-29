import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './webcomponents/Navbar';
import Home from './webpages/Home';
import InstructorLobby from './webpages/InstructorLobby';
import InstructorProfile from './webcomponents/InstructorProfile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='webpages'>
          <Routes>
            <Route
            path="/"
            element={<Home/>}
            />
          </Routes>

          <Routes>
            <Route
            path="/instructor/:id"
            element={<InstructorProfile/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
