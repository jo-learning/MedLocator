import HomeComponent from '../components/HomeComponent';
import React from 'react'
import { useState } from 'react';




export default function Home () {
    const [location, setLocation] = useState({ lat: null, lng: null });
    console.log(location)
    return (
        <>
            <HomeComponent />
            {/* <GeolocationTracker setLocations={setLocation} />
            {location.lat != null && (
                <MapComponent4 loc={location}/>
                // <h1>1</h1>
            )
            
            }             */}
            {/* <LeafletMap /> */}
            {/* <FileUpload /> */}

        </>
    );
}

