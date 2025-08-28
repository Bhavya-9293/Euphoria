import React, { useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-container">
     <div className="logo-section">
         <img src={logo} alt="Euphoria Logo" className="euphoria-logo" />
         <h1 className="euphoria-title">✨ EUPHORIA ✨</h1>
     </div>

        

      {showCards && (
        <div className="card-section fade-in">
          <div className="card" onClick={() => navigate('/user/login')}>User</div>
          <div className="card" onClick={() => navigate('/admin/login')}>Admin</div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
