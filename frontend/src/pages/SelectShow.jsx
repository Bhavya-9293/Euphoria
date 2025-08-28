import React from 'react';
import '../styles/SelectShow.css';
import { useNavigate } from 'react-router-dom';
import btsImg from '../assets/bts.webp';
import blackpinkImg from '../assets/blackpink.jpg';
import huntrixImg from '../assets/huntrix.webp';
import sajaboysImg from '../assets/sajaboys.webp';


function SelectShow() {
  const navigate = useNavigate();


  const handleSelect = (bandName) => {
  navigate(`/band/${bandName}`);
};


 const bands = [
  { name: 'BTS', image: btsImg },
  { name: 'Blackpink', image: blackpinkImg },
  { name: 'Huntrix', image: huntrixImg },
  { name: 'SajaBoys', image: sajaboysImg },
];

  return (
    <div className="select-show-container">
      <h2 className="select-show-title">Select Your K-Pop Band</h2>
      <div className="band-grid">
        {bands.map((band) => (
          <div
            key={band.name}
            className="band-card"
            onClick={() => navigate(`/band/${band.name.toLowerCase()}`)}
          >
            <img src={band.image} alt={band.name} />
            <h3>{band.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectShow;
