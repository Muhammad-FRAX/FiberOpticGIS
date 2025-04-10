import React, { useState, useEffect } from 'react';
import '../../styles/components/activealarms.css';
import UserTop from '../../assets/icons/user_top_icon.png';
import NotificationBell from '../../assets/icons/notifications_top_icon.png';
import RecentAlarms from '../../assets/icons/recent_alarms_icon.png';

const ActiveAlarms = ({ user, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        console.log('Fetching alarms from Neo4j...');
        const response = await fetch('http://localhost:5000/api/neo4j/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              MATCH (a:Alarm)
              WHERE a.alarm_status = 'ACTIVE'
              OPTIONAL MATCH (a)-[:BELONGS_TO]->(d:Device)
              OPTIONAL MATCH (a)-[:TRIGGERED_BY]->(t:Device)
              RETURN a {
                id: a.id,
                message: a.message,
                severity: a.severity,
                timestamp: a.timestamp,
                device_ip: a.device_ip
              }, 
              d.device_name as device_name,
              t.device_name as triggered_by_device
              ORDER BY a.timestamp DESC
              LIMIT 10
            `
          }),
        });

        const data = await response.json();
        console.log('Raw data from Neo4j:', data);
        
        const transformedAlarms = data.map(item => {
          console.log('Processing item:', item);
          return {
            id: item.a.id,
            name: item.a.message,
            severity: item.a.severity,
            timestamp: item.a.timestamp,
            device_ip: item.a.device_ip,
            device_name: item.device_name,
            triggered_by_device: item.triggered_by_device
          };
        });
        
        console.log('Transformed alarms:', transformedAlarms);
        setAlarms(transformedAlarms);
      } catch (error) {
        console.error('Error fetching alarms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms();
    const interval = setInterval(fetchAlarms, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes} pm`;
  };

  const getAlarmType = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'info';
    }
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="active-alarms">
      <div className="icons-container">
        <div className="user-menu" onClick={toggleMenu}>
          <span>{user?.username} ▼</span>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={onLogout}>Logout</button>
              <button>Settings</button>
            </div>
          )}
        </div>
        <img src={NotificationBell} alt='notibell' className="icon" />
        <img src={UserTop} alt='user' className="icon" />
      </div>
      <div className='current-notifications'>
        <h3>Recent Alarms</h3>
        <ul className="alarms-list">
          {loading ? (
            <li className="alarm-item">Loading alarms...</li>
          ) : alarms.length === 0 ? (
            <li className="alarm-item">No active alarms</li>
          ) : (
            alarms.map((alarm) => (
              <li key={alarm.id} className={`alarm-item ${getAlarmType(alarm.severity)}`}>
                <span className="timestamp">{formatTimestamp(alarm.timestamp)}</span>
                <span className="message">{alarm.name}</span>
                <span className="device-info">
                  Device: {alarm.device_ip || 'Unknown Device'}
                  {alarm.triggered_by_device && (
                    <span className="triggered-by">
                      Triggered by: {alarm.triggered_by_device}
                    </span>
                  )}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ActiveAlarms;