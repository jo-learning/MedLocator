import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ setLocation, location = {lat: 31.11 , lng: 12.11} }) => {
  const [position, setPosition] = useState({lat: location.lat, lng: location.lng});

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        setLocation({ lat, lng });
        console.log(lat + " " + lng)
        console.log(position)
      }
    });

    return position === null ? null : (
      <Marker position={position}></Marker>
    );
  };

  return (
    <MapContainer center={[13.487177181316815, 39.46855545043946]} zoom={13} style={{ height: '300px', width: '600px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;
