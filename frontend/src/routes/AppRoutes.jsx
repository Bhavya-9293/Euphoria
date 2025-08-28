import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AdminLogin from '../pages/AdminLogin';
import UserDashboard from '../pages/UserDashboard';
import YourShows from '../pages/YourShows';
import SelectShow from '../pages/SelectShow';
import BandShows from '../pages/BandShows';
import AdminDashboard from '../pages/AdminDashboard';
import AddShow from '../pages/AddShow';
import AdminPanel from '../pages/AdminPanel';
import CancelRequests from '../pages/CancelRequests';
import ViewRequests from '../pages/ViewRequests';






const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/login" element={<SignIn />} />
      <Route path="/user/signup" element={<SignUp />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/your-shows" element={<YourShows />} />
      <Route path="/user/select-show" element={<SelectShow />} />
      <Route path="/band/:bandName" element={<BandShows />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-show" element={<AddShow />} />
      <Route path="/admin/cancel-requests" element={<CancelRequests />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/view-requests" element={<ViewRequests/>} />
      <Route path="/admin/booking-requests" element={<AdminPanel />} />



    </Routes>
  );
};

export default AppRoutes;

