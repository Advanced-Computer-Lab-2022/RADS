import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './webcomponents/Navbar';
import InstructorLobby from './webpages/InstructorLobby';
import Home from './webpages/Home';
import Admin from './webpages/Admin';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='webpages'>
          <Routes>
            <Route
            path="/instructorlobby"
            element={<InstructorLobby/>}
            />
            <Route
            path="/"
            element={<Home/>}
            />
            <Route
            path="/adminlobby"
            element={<Admin/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
