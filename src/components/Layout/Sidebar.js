import React from 'react';
import '../../styles/components/sidebar.css';
import homeIcon from '../../assets/icons/home-icon.svg';
import listIcon from '../../assets/icons/list-icon.svg';
import warningsIcon from '../../assets/icons/warnings-icon.svg';
import historyIcon from '../../assets/icons/history-icon.svg';
import dashboardIcon from '../../assets/icons/dashboard-icon.svg';
import settingsIcon from '../../assets/icons/settings-icon.svg';

const Sidebar = () => {
  return (
    <aside className="sidebar">
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
            <a href="/warnings">
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
              <span className="title">Statstics</span>
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