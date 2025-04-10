import L from 'leaflet';

export const initializeMap = (mapContainerId) => {
    const map = L.map(mapContainerId, {attributionControl: false}).setView([15.500654, 32.559899], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        
    }).addTo(map);

    return map;
};