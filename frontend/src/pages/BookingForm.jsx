import React, { useState } from 'react';
import '../styles/BookingForm.css';

function BookingForm({ showId, seatType, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    upiId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/booking/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          seatType,
          showId
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Booking request submitted!');
        onClose(); // Close the form
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="booking-form-container">
      <h3>Complete Your Booking</h3>
      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="upiId"
          placeholder="Your UPI ID (e.g., username@bank)"
          value={formData.upiId}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookingForm;
