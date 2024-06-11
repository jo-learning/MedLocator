import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent4 = ({loc}) => {
  const [position, setPosition] = useState({lat: 13.487177181316815, lng: 39.46855545043946});
  console.log(loc)
  // var locator = loc.split(' ');
  // const lat = parseInt(locator[0], 10)
  // const lng = parseInt(locator[1], 10)
  // console.log (lat + lng)
  // const location = {lat: lat, lng: lng}

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        console.log(lat + " " + lng)
        console.log(position)
      }
    });

    return position === null ? null : (
      <Marker position={loc}></Marker>
    );
  };

  return (
    <MapContainer center={[loc.lat, loc.lng]} zoom={13} style={{ height: '300px', width: '600px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent4;
