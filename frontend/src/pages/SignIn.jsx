// src/pages/SignIn.jsx
import React, { useState } from 'react';
import '../styles/SignIn.css';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json(); // ✅ Must come before using data.email

    if (response.ok) {
      localStorage.setItem('userEmail', data.email); // ✅ Store properly
      alert('Login successful!');
      navigate('/user/dashboard');
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Server error');
  }
};


  return (
    <div className="signin-container">
      <h2 className="signin-title">User Sign In</h2>
      <form className="signin-form" onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <p className="signup-link">
          New user? <span onClick={() => navigate('/user/signup')}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
