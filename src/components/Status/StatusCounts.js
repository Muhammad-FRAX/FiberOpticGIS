import React from 'react';
import '../../styles/components/statuscounts.css';
import devicesIcon from '../../assets/icons/device-icon.png';
import linksIcon from '../../assets/icons/link-icon.png';
import linkdown from  '../../assets/icons/link-down.png';
import linkup from '../../assets/icons/link-up.png';
import devicedown from '../../assets/icons/device-down.png';
import deviceup from '../../assets/icons/device-up.png';

const StatusCounts = ({ downDevices, downLinks }) => {
  const upDevices = 67 - downDevices;
  const upLinks = 55 - downLinks;

  //date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="status-counts">
      {/* Add the Today section */}
      <div className="today-section">
        <span className="today-label">Today</span>
        <span className="today-date">{formattedDate}</span>
      </div>
      <div className="status-item Devices-box">
        {/* Top Row: Main Icon and Label */}
        <div className="status-top">
          <img src={devicesIcon} alt="Devices Icon" className="status-icon" />
          <span className="status-label">Devices</span>
        </div>
        {/* Middle Row: Up */}
        <div className="status-middle">
          <span className="sub-label">Up</span>
          <img src={deviceup} alt="Device Up Icon" className="sub-icon" />
          <span className="sub-value">{upDevices}</span>
        </div>
        {/* Bottom Row: Down */}
        <div className="status-bottom">
          <span className="sub-label">Down</span>
          <img src={devicedown} alt="Device Down Icon" className="sub-icon" />
          <span className="sub-value">{downDevices}</span>
        </div>
      </div>
      <div className="status-item Links-box">
        {/* Top Row: Main Icon and Label */}
        <div className="status-top">
          <img src={linksIcon} alt="Links Icon" className="status-icon" />
          <span className="status-label">Links</span>
        </div>
        {/* Middle Row: Up */}
        <div className="status-middle">
          <span className="sub-label">Up</span>
          <img src={linkup} alt="Link Up Icon" className="sub-icon" />
          <span className="sub-value">{upLinks}</span>
        </div>
        {/* Bottom Row: Down */}
        <div className="status-bottom">
          <span className="sub-label">Down</span>
          <img src={linkdown} alt="Link Down Icon" className="sub-icon" />
          <span className="sub-value">{downLinks}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCounts;
//
