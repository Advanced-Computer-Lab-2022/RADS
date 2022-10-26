import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './webcomponents/Navbar';
import Home from './webpages/Home';
import InstructorLobby from './webpages/InstructorLobby';

import * as React from 'react';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Button variant="contained">Dummy Button</Button>
        
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
