import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page section">
      <div className="page-hero-content text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-dwm-green-deep mb-4">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-xl text-dwm-text-mid">
          Your personal health dashboard
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
