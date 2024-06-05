import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeComponent from '../components/HomeComponent';
import React from 'react'
import MapComponent from '../components/Map';
import { useState } from 'react';


export default function Home () {
    const [location, setLocation] = useState({ lat: null, lng: null });
    console.log(location)
    return (
        <>
            <HomeComponent />
            
            <div className='h-8'></div>
            <div className='flex justify-center items-center'>
            <MapComponent setLocation={setLocation}/>
            </div>
            <div className='h-8'></div>

        </>
    );
}