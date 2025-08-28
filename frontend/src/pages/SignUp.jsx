import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate(); // ✅ fixes 'navigate' is not defined

  const [formData, setFormData] = useState({ // ✅ fixes 'formData' is not defined
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }



  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      
    });

    const data = await response.json();

    if (response.ok) {
      alert('Signup successful! Please login.');
      navigate('/user/login');
    } else {
      alert(data.message || 'Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Server error');
  }
};


  return (
    <div className="signup-container">
      <h2 className="signup-title">User Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
        <p className="signin-link">
          Already have an account? <span onClick={() => navigate('/user/login')}>Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
