// src/pages/CancelRequests.jsx
import React, { useEffect, useState } from 'react';
import '../styles/CancelRequests.css';
import API_BASE_URL from "../config";

function CancelRequests() {
  const [cancelRequests, setCancelRequests] = useState([]);

  useEffect(() => {
    fetchCancelRequests();
  }, []);

  const fetchCancelRequests = async () => {
    try {
      const res = await fetch('${API_BASE_URL}/api/booking/cancel-requests');
      const data = await res.json();
      setCancelRequests(data);
    } catch (error) {
      console.error('Error fetching cancel requests:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/booking/cancel-approve/${id}`, {
        method: 'POST'
      });

      const data = await res.json();

      if (res.ok) {
        alert('Cancellation approved & booking removed!');
        fetchCancelRequests(); // refresh list
      } else {
        alert(data.message || 'Approval failed');
      }
    } catch (error) {
      console.error('Error approving cancellation:', error);
    }
  };

  return (
    <div className="cancel-requests">
      <h2>Cancel Requests</h2>
      {cancelRequests.length === 0 ? (
        <p>No cancel requests found.</p>
      ) : (
        <div className="cancel-request-list">
          {cancelRequests.map((req) => (
            <div key={req._id} className="cancel-request-card">
              <p><strong>Name:</strong> {req.bookingId?.name}</p>
              <p><strong>Email:</strong> {req.bookingId?.email}</p>
              <p><strong>Band:</strong> {req.bookingId?.showId?.band || 'N/A'}</p>
              <p><strong>Location:</strong> {req.bookingId?.showId?.location || 'N/A'}</p>
              <p><strong>Date:</strong> {req.bookingId?.showId?.date?.slice(0, 10) || 'N/A'}</p>
              <p><strong>Seat Type:</strong> {req.bookingId?.seatType}</p>

              <button onClick={() => handleApprove(req._id)}>Approve Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CancelRequests;
