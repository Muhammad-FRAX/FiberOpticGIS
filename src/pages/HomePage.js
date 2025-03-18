import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
//import Header from '../components/Layout/Header';
import MapView from '../components/Map/MapView';
//import AlarmHistory from '../components/History/AlarmHistory';
import ActiveAlarms from '../components/Alarms/ActiveAlarms';
import '../styles/pages/homepage.css';

const HomePage = ({ user, onLogout }) => {
  return (
    <div className="home-page">
      <Sidebar />
      <div className="main-content">
        
        <div className="content-section">
          <MapView />
          <ActiveAlarms />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
