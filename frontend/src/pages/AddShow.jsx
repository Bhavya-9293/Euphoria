import React, { useState } from 'react';
import '../styles/AddShow.css';

function AddShow() {
  const [formData, setFormData] = useState({
    band: '',
    date: '',
    time: '',
    location: '',
    boxPrice: '',
    upperPrice: '',
    generalPrice: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Sending to backend:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/shows/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          band: formData.band.toLowerCase(),
          boxPrice: Number(formData.boxPrice),
          upperPrice: Number(formData.upperPrice),
          generalPrice: Number(formData.generalPrice),
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Show added successfully!');
        setFormData({
          band: '',
          date: '',
          time: '',
          location: '',
          boxPrice: '',
          upperPrice: '',
          generalPrice: ''
        });
      } else {
        alert(data.message || 'Failed to add show');
      }
    } catch (error) {
      console.error('Add show error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="addshow-container">
      <h2 className="addshow-title">Add New Concert</h2>
      <form className="addshow-form" onSubmit={handleSubmit}>
        <select name="band" value={formData.band} onChange={handleChange} required>
          <option value="">Select Band</option>
          <option value="bts">BTS</option>
          <option value="blackpink">Blackpink</option>
          <option value="huntrix">Huntrix</option>
          <option value="sajaboys">SajaBoys</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="number" name="boxPrice" placeholder="Box Seating Price" value={formData.boxPrice} onChange={handleChange} required />
        <input type="number" name="upperPrice" placeholder="Upper Level Price" value={formData.upperPrice} onChange={handleChange} required />
        <input type="number" name="generalPrice" placeholder="General Seating Price" value={formData.generalPrice} onChange={handleChange} required />
        <button type="submit">Add Show</button>
      </form>
    </div>
  );
}

export default AddShow;
