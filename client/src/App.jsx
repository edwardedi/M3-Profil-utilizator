import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Welcome from './Wellcome.jsx'; 
import UserProf from './UserProf.jsx';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} /> {}
          <Route path="/login" element={<Login />} /> {}
          <Route path="/signup" element={<Signup />} /> {}
          <Route path="/user-profile" element={<UserProf />} /> {}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
