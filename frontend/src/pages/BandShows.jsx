import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BandShows.css';
import boxQR from '../assets/boxqr.png';
import upperQR from '../assets/upperqr.png';
import generalQR from '../assets/generalqr.png';
import BookingForm from './BookingForm';


function BandShows() {
  const { bandName } = useParams();
  const [shows, setShows] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState({});
  const [showQR, setShowQR] = useState({});
  const [formVisible, setFormVisible] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/shows/band/${bandName}`)
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch((err) => console.error('Error fetching shows:', err));
  }, [bandName]);

  const handleSeatChange = (showId, seatType) => {
    setSelectedSeat((prev) => ({ ...prev, [showId]: seatType }));
  };

  const handleBookClick = (showId) => {
    if (!selectedSeat[showId]) {
      alert('Please select a seat type');
      return;
    }
    setShowQR((prev) => ({ ...prev, [showId]: true }));
  };

  const handleQRConfirm = (showId) => {
    setFormVisible((prev) => ({ ...prev, [showId]: true }));
  };

  const handleFormClose = (showId) => {
    setFormVisible((prev) => ({ ...prev, [showId]: false }));
    setShowQR((prev) => ({ ...prev, [showId]: false }));
    setSelectedSeat((prev) => ({ ...prev, [showId]: '' }));
  };

  const getQRImage = (seatType) => {
    switch (seatType) {
      case 'box':
        return boxQR;
      case 'upper':
        return upperQR;
      case 'general':
        return generalQR;
      default:
        return '';
    }
  };

  return (
    <div className="bandshows-container">
      <h2 className="band-title">Upcoming Shows - {bandName.toUpperCase()}</h2>
      {shows.length === 0 ? (
        <p>No shows available for this band.</p>
      ) : (
        shows.map((show) => (
          <div key={show._id} className="show-card">
            <p><strong>Date:</strong> {show.date}</p>
            <p><strong>Time:</strong> {show.time}</p>
            <p><strong>Location:</strong> {show.location}</p>
            <select
              value={selectedSeat[show._id] || ''}
              onChange={(e) => handleSeatChange(show._id, e.target.value)}
            >
              <option value="">Select Seat Type</option>
              <option value="box">Box - ₹{show.boxPrice}</option>
              <option value="upper">Upper Level - ₹{show.upperPrice}</option>
              <option value="general">General - ₹{show.generalPrice}</option>
            </select>
            <button onClick={() => handleBookClick(show._id)}>Book</button>

            {showQR[show._id] && (
              <div className="qr-section">
                <p>Scan to Pay via UPI</p>
                <img src={getQRImage(selectedSeat[show._id])} alt="QR Code" className="qr-image" />
                <button onClick={() => handleQRConfirm(show._id)}>I have paid</button>
              </div>
            )}

            {formVisible[show._id] && (
              <BookingForm
                showId={show._id}
                seatType={selectedSeat[show._id]}
                onClose={() => handleFormClose(show._id)}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default BandShows;
