import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import '../styles/pages/alarms.css';

const Alarms = () => {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/neo4j/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              MATCH (a:Alarm)-[:TRIGGERED_BY]->(d:Device)
              RETURN a {
                id: a.id,
                message: a.message,
                severity: a.severity,
                timestamp: a.timestamp,
                device_ip: a.device_ip
              }, 
              d.device_name as device_name
              ORDER BY a.timestamp DESC
            `
          }),
        });

        const data = await response.json();
        const transformedAlarms = data.map(item => ({
          id: item.a.id,
          name: item.a.message,
          severity: item.a.severity,
          timestamp: item.a.timestamp,
          device_ip: item.a.device_ip,
          device_name: item.device_name
        }));
        setAlarms(transformedAlarms);
      } catch (error) {
        console.error('Error fetching alarms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms();
    const interval = setInterval(fetchAlarms, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getSeverityClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'error';
      case 'major':
        return 'warning';
      case 'minor':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <div className="alarms-page">
      <Sidebar />
      <div className="alarms-content">
        <div className="alarms-header">
          <h2>Network Alarms</h2>
        </div>
        <div className="alarms-container">
          {loading ? (
            <div className="loading">Loading alarms...</div>
          ) : alarms.length === 0 ? (
            <div className="no-alarms">No alarms found</div>
          ) : (
            alarms.map((alarm) => (
              <div key={alarm.id} className={`alarm-item ${getSeverityClass(alarm.severity)}`}>
                <div className="alarm-content">
                  <div className="alarm-info">
                    <div className="alarm-title">
                      <span className="alarm-name">{alarm.name || 'Unnamed Alarm'}</span>
                      <span className="severity-badge">
                        {alarm.severity || 'Unknown'}
                      </span>
                    </div>
                    <div className="alarm-details">
                      <span className="alarm-device">{alarm.device_name || 'Unknown Device'}</span>
                      <span className="alarm-timestamp">{formatTimestamp(alarm.timestamp)}</span>
                    </div>
                    {alarm.description && (
                      <p className="alarm-description">{alarm.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Alarms;