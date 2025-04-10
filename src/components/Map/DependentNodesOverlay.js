import React from 'react';
import '../../styles/components/dependentnodesoverlay.css';

const DependentNodesOverlay = ({ device, dependentNodes, onClose }) => {
  // Helper function to format device details
  const formatDeviceDetails = (device) => {
    const details = [];
    if (device.device_name) details.push({ label: 'Device Name', value: device.device_name });
    if (device.device_ip) details.push({ label: 'IP Address', value: device.device_ip });
    if (device.device_role) details.push({ label: 'Role', value: device.device_role });
    if (device.device_type) details.push({ label: 'Type', value: device.device_type });
    if (device.status) details.push({ label: 'Status', value: device.status });
    return details;
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="overlay-grid">
          <div className="overlay-section">
            <h3>Dependent Nodes</h3>
            {dependentNodes.length > 0 ? (
              <ul>
                {dependentNodes.map((node, index) => (
                  <li key={index}>
                    <div className="node-info">
                      <strong>{node.device_name}</strong>
                      <span className={`status ${node.status.toLowerCase()}`}>
                        {node.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-nodes">No dependent nodes found</p>
            )}
          </div>
          <div className="overlay-section device-details">
            <h3>Device Details</h3>
            <div className="details-list">
              {formatDeviceDetails(device).map((detail, index) => (
                <div key={index} className="detail-item">
                  <span className="detail-label">{detail.label}:</span>
                  <span className={`detail-value ${detail.label === 'Status' ? detail.value.toLowerCase() : ''}`}>
                    {detail.value}
                  </span>
                </div>
              ))}
              <div className='detail-item'>
                <span className='detail-label'>Number of Dependent Devices:</span>
                <span className='detail-value'>{dependentNodes.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependentNodesOverlay;