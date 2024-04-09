import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login.jsx';
import Welcome from './Wellcome.jsx'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} /> {}
          <Route path="/login" element={<Login />} /> {}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
