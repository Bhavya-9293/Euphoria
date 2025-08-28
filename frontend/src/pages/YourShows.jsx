import React, { useEffect, useState } from 'react';
import '../styles/YourShows.css';
import API_BASE_URL from "../config";


function YourShows() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      const email = localStorage.getItem('userEmail');
      console.log("Email from localStorage:", email);

      if (!email) {
        alert('User not logged in.');
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/booking/user-bookings?email=${email}`);
        const data = await res.json();
        console.log("Fetched bookings:", data);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchConfirmedBookings(); // ✅ Call inside
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/booking/cancel-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Cancellation request sent to admin!');
        // ✅ Re-fetch updated bookings
        const updatedEmail = localStorage.getItem('userEmail');
        const updatedRes = await fetch(`http://localhost:5000/api/booking/user-bookings?email=${updatedEmail}`);
        const updatedData = await updatedRes.json();
        setBookings(updatedData);
      } else {
        alert(data.message || 'Failed to send cancellation request');
      }
    } catch (error) {
      console.error('Cancel request error:', error);
    }
  };

  return (
    <div className="user-shows-container">
      <h2>Your Booked Shows</h2>
      {bookings.length === 0 ? (
        <p>No confirmed bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="user-show-card">
            <p><strong>Band:</strong> {booking.showId?.band}</p>
            <p><strong>Date:</strong> {booking.showId?.date ? new Date(booking.showId.date).toDateString() : 'N/A'}</p>
            <p><strong>Location:</strong> {booking.showId?.location}</p>
            <p><strong>Seat Type:</strong> {booking.seatType}</p>
            <button onClick={() => handleCancel(booking._id)}>Cancel</button>
          </div>
        ))
      )}
    </div>
  );
}

export default YourShows;
