// src/pages/ViewRequests.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewRequests.css';

function ViewRequests() {
  const navigate = useNavigate();

  return (
    <div className="view-requests">
      <h2>View Requests</h2>
      <button onClick={() => navigate('/admin/booking-requests')}>Booking Requests</button>
      <button onClick={() => navigate('/admin/cancel-requests')}>Cancel Requests</button>

    </div>
  );
}

export default ViewRequests;
