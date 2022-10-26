import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './webcomponents/Navbar';
import Home from './webpages/Home';
import InstructorLobby from './webpages/InstructorLobby';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='webpages'>
          <Routes>
            <Route
            path="/"
            element={<InstructorLobby/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
