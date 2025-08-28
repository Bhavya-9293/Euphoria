import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import { PlusCircle, ClipboardList } from 'lucide-react';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate('/admin/add-show')}>
        <PlusCircle size={18} /> Add Show
      </button>

      <button onClick={() => navigate('/admin/view-requests')}>
        <ClipboardList size={18} /> View Requests
      </button>
    </div>
  );
}

export default AdminDashboard;
