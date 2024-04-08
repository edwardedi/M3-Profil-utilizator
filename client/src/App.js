import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login.js';
import Welcome from './Wellcome.js'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} /> {/* optional pui ruta catre pagina wellcome la fel si jos */}
          <Route path="/login" element={<Login />} /> {}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
