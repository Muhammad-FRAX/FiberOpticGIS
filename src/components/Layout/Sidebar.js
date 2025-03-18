import React from 'react';
import '../../styles/components/sidebar.css';
import homeIcon from '../../assets/icons/home-icon.png';
import listIcon from '../../assets/icons/list-icon.png';
import warningsIcon from '../../assets/icons/alarm_icon.png';
import historyIcon from '../../assets/icons/history_icon.png';
import dashboardIcon from '../../assets/icons/dashboard-icon.png';
import settingsIcon from '../../assets/icons/settings-icon.png';

const Sidebar = () => {
  return (
    <aside className="sidebar">
            {}
      <div className="site-title">
      Fiber Optic GIS
      </div>
      <nav>
        <ul>
          <li>
            <a href="/home">
              <img src={homeIcon} alt="Home" className="icon" />
              <span className="title">Home</span>
            </a>
          </li>
          <li>
            <a href="/list">
              <img src={listIcon} alt="List" className="icon" />
              <span className="title">List</span>
            </a>
          </li>
          <li>
            <a href="/Alarms">
              <img src={warningsIcon} alt="Alarms" className="icon" />
              <span className="title">Alarms</span>
            </a>
          </li>
          <li>
            <a href="/history">
              <img src={historyIcon} alt="History" className="icon" />
              <span className="title">History</span>
            </a>
          </li>
          <li>
            <a href="/dashboard">
              <img src={dashboardIcon} alt="Dashboard" className="icon" />
              <span className="title">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/settings">
              <img src={settingsIcon} alt="Settings" className="icon" />
              <span className="title">Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;