import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import 'leaflet-routing-machine';

const LeafletMap = ({ locations }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      mapRef.current = L.map(mapContainer.current).setView([locations[0].lat, locations[0].lng], 13);

      // Set up the OpenStreetMap layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Define custom red icon
    const redIcon = new L.Icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDE0IDIxIj4KICA8cGF0aCBkPSJNNyAwQzIuOCAwIDAgMy4yIDAgNy41YzAgNi41IDcgMTMuNSA3IDEzLjVzNy03IDctMTMuNUMxNCAzLjIgMTEuMiAwIDcgMHptMCA5LjJhMi4yIDIuMiAwIDEgMSAwLTQuNCAyLjIgMi4yIDAgMCAxIDAgNC40eiIgZmlsbD0iI2ZmMDAwMCIvPgo8L3N2Zz4=', // SVG data URL for red marker
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Function to create a custom icon
    const createCustomIcon = (color) => {
      if (color === 'red') {
        return redIcon;
      }
      return new L.Icon.Default(); // Return default icon
    };

    // Remove existing markers and routing control
    if (routingControlRef.current) {
      routingControlRef.current.getPlan().setWaypoints([]);
      routingControlRef.current.remove();
    }
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    // Add markers to the map
    locations.forEach(location => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createCustomIcon(location.color)
      }).addTo(map);
    });

    // Add routing control to the map
    routingControlRef.current = L.Routing.control({
      waypoints: locations.map(loc => L.latLng(loc.lat, loc.lng)),
      routeWhileDragging: true,
      createMarker: function() { return null; },  // Prevent default markers
      show: true,  // Hide default routing info
      addWaypoints: false,  // Prevent adding waypoints by clicking on the route
      fitSelectedRoutes: false,  // Prevent map from auto-zooming to fit the route
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }]
      },
      formatter: new L.Routing.Formatter({
        containerClassName: ''  // Remove the default class that shows steps
      })
    }).addTo(map);

    // Event listener for route found
    routingControlRef.current.on('routesfound', function (e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      const steps = routes[0].instructions;

      // Log the route information
      console.log('Total distance:', summary.totalDistance, 'meters');
      console.log('Total time:', summary.totalTime, 'seconds');

      // Log each step of the route
    //   steps.forEach((step, index) => {
    //     console.log(`Step ${index + 1}: ${step.text}`);
    //   });
    });
  }, [locations]);

  return <div ref={mapContainer} style={{ height: '500px' }} />;
};

export default LeafletMap;
