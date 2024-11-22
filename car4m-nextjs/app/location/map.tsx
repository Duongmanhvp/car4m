import { useEffect } from 'react';
import L from 'leaflet';

interface MapProps {
    latitude: number 
    longitude: number
    zoom?: number
}

const Map: React.FC<MapProps> = ({ latitude, longitude, zoom = 3 }) => {
    useEffect(() => {
        const map = L.map('map').setView([latitude, longitude], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup('Vị trí map.')
            .openPopup();

        return () => {
            map.remove(); // Dọn dẹp bản đồ khi component bị hủy
        };
    }, [latitude, longitude, zoom]);

    return <div id="map" className="w-[400px] h-[400px] rounded-lg"></div>;
};

export default Map;
