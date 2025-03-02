import React from 'react';
import '../../styles/components/alarmhistory.css';

const AlarmHistory = () => {
  const alarms = [
    { id: 1, message: 'Fiber cut detected', timestamp: '2025-02-24 10:00:00' },
    { id: 2, message: 'Power outage', timestamp: '2025-02-24 09:30:00' },
    { id: 3, message: 'High latency detected', timestamp: '2025-02-24 08:45:00' }
  ];

  return (
    <div className="alarm-history">
      <h3>Recent Alarms</h3>
      <ul>
        {alarms.map((alarm) => (
          <li key={alarm.id}>
            <span className="timestamp">{alarm.timestamp}</span>
            <span className="message">{alarm.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlarmHistory;
