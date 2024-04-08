import React from 'react';
import { Link } from 'react-router-dom';

function Connect() {
  return (
    <div className="connect-container">
      <h1>Welcome to Connect</h1>
      <p>Please sign in to continue.</p>
      <Link to="/login"> {/Users/denisroca/Downloads/Facultate/ProiectIP/profil-utilizator/src/Login.js}
        <button className="auth-button">Sign In</button>
      </Link>
    </div>
  );
}
export default Connect;
