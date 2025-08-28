import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/AdminPanel.css';

function AdminPanel() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/booking/requests');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching booking requests:', err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/booking/approve/${id}`, {
        method: 'POST'
      });

      const data = await res.json();

      if (res.ok) {
        alert('Request approved and email sent!');
        fetchRequests(); // refresh the list
      } else {
        alert(data.message || 'Approval failed');
      }
    } catch (err) {
      console.error('Approval error:', err);
    }
  };

  return (

    

    <div className="admin-container">
        
      <h2>Booking Requests</h2>
      {requests.length === 0 ? (
        <p>No pending booking requests.</p>
      ) : (
        <div className="request-list">
          {requests.map((req) => (
            <div key={req._id} className="request-card">
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>UPI ID:</strong> {req.upiId}</p>
              <p><strong>Seat Type:</strong> {req.seatType}</p>
              <p><strong>Band:</strong> {req.showId?.band || 'N/A'}</p>
              <p><strong>Date:</strong> {req.showId?.date?.slice(0, 10) || 'N/A'}</p>
              <p><strong>Location:</strong> {req.showId?.location || 'N/A'}</p>

              <button onClick={() => handleApprove(req._id)}>Accept</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
