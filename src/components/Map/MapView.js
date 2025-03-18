import React, { useEffect, useState, useCallback } from 'react';
import L from 'leaflet'; // Import Leaflet
import { initializeMap } from '../../services/mapService';
import { fetchSitesAndLinks } from '../../services/neo4jService';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import '../../styles/components/mapview.css';
import customIconUrl from '../../assets/icons/NE.png'; // Import the custom icon image

const MapView = () => {
  const [map, setMap] = useState(null);

  // Initialize the map once when the component mounts
  useEffect(() => {
    const mapInstance = initializeMap('map-container');
    setMap(mapInstance);
  }, []);

  // Create a custom Leaflet icon
  const customIcon = L.icon({
    iconUrl: customIconUrl,
    iconSize: [32, 32], // Adjust the size as needed
    iconAnchor: [16, 16], // Adjust the anchor point as needed
    popupAnchor: [0, -16] // Adjust the popup anchor point as needed
  });

  // Function to update the map with new data
  const updateMap = useCallback((sites) => {
    if (!map) return;

    // Clear existing layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Add new markers and polylines
    sites.forEach(({ site, devices, linkedSites }) => {
      if (site.latitude && site.longitude) {
        const marker = L.marker([site.latitude, site.longitude], { icon: customIcon }).addTo(map);
        const popupContent = `
          <div>
            <b>${site.site_name}</b><br/>
            <p>Site Code: ${site.site_code}</p>
            <p>Latitude: ${site.latitude}</p>
            <p>Longitude: ${site.longitude}</p>
            <p>Zone: ${site.site_zone}</p>
            <p>Devices:</p>
            <ul>
              ${devices.map(device => `<li>${device.device_name}</li>`).join('')}
            </ul>
          </div>
        `;
        marker.bindPopup(popupContent);

        linkedSites.forEach(({ site: linkedSite, link }) => {
          if (linkedSite && linkedSite.latitude && linkedSite.longitude) {
            const latlngs = [
              [site.latitude, site.longitude],
              [linkedSite.latitude, linkedSite.longitude]
            ];
            const color = link && link.status === 'UP'
              ? '#39ff39'
              : link && link.status === 'DOWN'
              ? 'red'
              : 'grey';
            L.polyline(latlngs, { color, weight: 2 }).addTo(map); // Set color and thickness
          }
        });
      }
    });
  }, [map, customIcon]);

  // Set up a timer to fetch data and update the map every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const sites = await fetchSitesAndLinks();
        updateMap(sites);
      } catch (error) {
        console.error('Error fetching and updating map data:', error);
      }
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [map, updateMap]);

  return <div id="map-container" className="map-container"></div>;
};

export default MapView;