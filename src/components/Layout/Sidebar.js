import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
      <div className="site-title">
        Fiber Optic GIS
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <img src={homeIcon} alt="Home" className="icon" />
              <span className="title">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/list">
              <img src={listIcon} alt="List" className="icon" />
              <span className="title">List</span>
            </Link>
          </li>
          <li>
            <Link to="/alarms">
              <img src={warningsIcon} alt="Alarms" className="icon" />
              <span className="title">Alarms</span>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <img src={historyIcon} alt="History" className="icon" />
              <span className="title">History</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <img src={dashboardIcon} alt="Dashboard" className="icon" />
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <img src={settingsIcon} alt="Settings" className="icon" />
              <span className="title">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;