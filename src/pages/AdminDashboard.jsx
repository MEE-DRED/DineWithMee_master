import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="admin-dashboard-page section">
      <div className="page-hero-content text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-dwm-green-deep mb-4">
          Admin Dashboard
        </h1>
        <p className="text-xl text-dwm-text-mid">
          Welcome, {user?.name || 'Admin'}!
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
