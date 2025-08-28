// src/pages/UserDashboard.jsx
import React from 'react';
import '../styles/UserDashboard.css';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Euphoria</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate('/user/your-shows')}>
          Your Shows
        </div>
        <div className="dashboard-card" onClick={() => navigate('/user/select-show')}>
          Select a Show
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
