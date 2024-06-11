import React, { useState, useEffect } from 'react';


export default function GeolocationTracker ({setLocations}) {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLocations({lat: latitude, lng:longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );

      // Cleanup function to clear the watcher when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h1>Geolocation Tracker</h1>
      <p>
        {location.latitude && location.longitude
          ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
          : 'Tracking location...'}
      </p>
    </div>
  );
};

// export default GeolocationTracker;
