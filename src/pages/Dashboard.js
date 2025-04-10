import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import '../styles/pages/dashboard.css';
import ActiveAlarms from '../components/Alarms/ActiveAlarms';
const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Sidebar />
      
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <p>Welcome to the Dashboard!</p>
        {/* Add more dashboard content here */}
      </div>
      <ActiveAlarms />
    </div>
  );
};

export default Dashboard;