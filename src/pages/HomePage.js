import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import MapView from '../components/Map/MapView';
import ActiveAlarms from '../components/Alarms/ActiveAlarms';
import StatusCounts from '../components/Status/StatusCounts';
import DependentNodesOverlay from '../components/Map/DependentNodesOverlay';
import { fetchDependentNodes } from '../services/neo4jService';
import '../styles/pages/homepage.css';

const HomePage = ({ user, onLogout }) => {
  const [downDevices, setDownDevices] = useState(0);
  const [downLinks, setDownLinks] = useState(0);
  const [dependentNodes, setDependentNodes] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/down-counts');
        if (!response.ok) {
          throw new Error('Failed to fetch down counts');
        }
        const { downDevices, downLinks } = await response.json();
        setDownDevices(downDevices);
        setDownLinks(downLinks);
      } catch (error) {
        console.error('Error fetching down counts:', error);
      }
    };

    fetchCounts();
    const intervalId = setInterval(fetchCounts, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDeviceClick = async (device) => {
    console.log('handleDeviceClick called with device:', device);
    try {
      setSelectedDevice(device);
      console.log('Fetching dependent nodes for device:', device.device_name);
      const nodes = await fetchDependentNodes(device.device_name);
      console.log('Fetched dependent nodes:', nodes);
      setDependentNodes(nodes);
      setShowOverlay(true);
      console.log('Overlay state updated:', { showOverlay: true, selectedDevice: device, dependentNodes: nodes });
    } catch (error) {
      console.error('Error fetching dependent nodes:', error);
    }
  };

  const handleCloseOverlay = () => {
    console.log('Closing overlay');
    setShowOverlay(false);
    setSelectedDevice(null);
  };

  // Add effect to monitor state changes
  useEffect(() => {
    console.log('State updated:', { showOverlay, selectedDevice, dependentNodes });
  }, [showOverlay, selectedDevice, dependentNodes]);

  return (
    <div className="home-page">
      <Sidebar/>
      <div className="main-content">
        <StatusCounts downDevices={downDevices} downLinks={downLinks} />
        <div className="content-section">
          <MapView onDeviceClick={handleDeviceClick} />
        </div>
      </div>
      <div className="right-side">
        <ActiveAlarms user={user} onLogout={onLogout} />
      </div>
      {showOverlay && selectedDevice && (
        <DependentNodesOverlay
          device={selectedDevice}
          dependentNodes={dependentNodes}
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
};

export default HomePage;