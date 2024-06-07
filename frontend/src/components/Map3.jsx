// MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux';



// Fix the default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent3 = ({pharmacy_postion}) => {
    const { currentUser } = useSelector((state) => state.user);
  const position1 = [currentUser.message.latitude, currentUser.message.longitude]; // New York City
  const position2 = pharmacy_postion; // Los Angeles

  console.log(position1)

  const redIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDE0IDIxIj4KICA8cGF0aCBkPSJNNyAwQzIuOCAwIDAgMy4yIDAgNy41YzAgNi41IDcgMTMuNSA3IDEzLjVzNy03IDctMTMuNUMxNCAzLjIgMTEuMiAwIDcgMHptMCA5LjJhMi4yIDIuMiAwIDEgMSAwLTQuNCAyLjIgMi4yIDAgMCAxIDAgNC40eiIgZmlsbD0iI2ZmMDAwMCIvPgo8L3N2Zz4=', // SVG data URL for red marker
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

  return (
    <MapContainer center={position1} zoom={4} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position1} />
      <Marker position={position2} icon={redIcon}/>
      <Polyline positions={[position1, position2]} color="blue" />
    </MapContainer>
  );
};

export default MapComponent3;
