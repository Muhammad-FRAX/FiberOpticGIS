import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import MapView from '../components/Map/MapView';
import AlarmHistory from '../components/History/AlarmHistory';
import '../styles/pages/homepage.css';

const HomePage = ({ user, onLogout }) => {
  return (
    <div className="home-page">
      <Sidebar />
      <div className="main-content">
        <Header user={user} onLogout={onLogout} />
        <div className="content-section">
          <MapView />
          <AlarmHistory />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
