import React from 'react';
import '../../styles/components/activealarms.css';

const ActiveAlarms = () => {
  const alarms = [
    { id: 1, timestamp: '2025-3-2 10:45:00', message: 'Power outage', type: 'warning' },
    { id: 2, timestamp: '2025-3-2 12:45:00', message: 'Fiber cut', type: 'error' },
    { id: 3, timestamp: '2025-3-2 01:45:00', message: 'High Latency', type: 'info' },
  ];

  return (
    <div className="active-alarms">
      <h3> </h3>
      <ul>
        {alarms.map((alarm) => (
          <li key={alarm.id} className={`alarm-item ${alarm.type}`}>
            <span className="timestamp">{alarm.timestamp}</span>
            <span className="message">{alarm.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveAlarms;