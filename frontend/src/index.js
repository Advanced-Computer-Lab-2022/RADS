import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { InstructorContextProvider } from './context/InstructorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <InstructorContextProvider>
      <App />
    </InstructorContextProvider> */}
      <App />
  </React.StrictMode>
);

