import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Import Leaflet
import { initializeMap } from '../../services/mapService';
import { fetchSitesAndLinks } from '../../services/neo4jService';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import '../../styles/components/mapview.css';

const MapView = () => {
  const [map, setMap] = useState(null);

  // Initialize the map once when the component mounts
  useEffect(() => {
    const mapInstance = initializeMap('map-container');
    setMap(mapInstance);
  }, []);

  // Load site and link data once the map is available
  useEffect(() => {
    if (!map) return; // Guard clause if the map isn't ready

    const loadData = async () => {
      try {
        const sites = await fetchSitesAndLinks();
        console.log('Fetched sites:', sites);
        sites.forEach(({ site, linkedSites }) => {
          // Make sure the site has valid coordinates
          if (site.latitude && site.longitude) {
            const marker = L.marker([site.latitude, site.longitude]).addTo(map);
            marker.bindPopup(`<b>${site.site_name}</b>`);

            // Loop over linked sites and draw a polyline for each valid link
            linkedSites.forEach(({ site: linkedSite, link }) => {
              if (linkedSite && linkedSite.latitude && linkedSite.longitude) {
                const latlngs = [
                  [site.latitude, site.longitude],
                  [linkedSite.latitude, linkedSite.longitude]
                ];
                const color = link && link.status === 'UP'
                  ? 'green'
                  : link && link.status === 'DOWN'
                  ? 'red'
                  : 'grey';
                L.polyline(latlngs, { color }).addTo(map);
              }
            });
          }
        });
      } catch (error) {
        console.error('Error loading site data:', error);
      }
    };

    loadData();
  }, [map]);

  return <div id="map-container" className="map-container"></div>;
};

export default MapView;
