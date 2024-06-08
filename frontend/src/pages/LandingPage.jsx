// import Header from '../components/Header'
// import Footer from '../components/Footer'
import HomeComponent1 from '../components/HomeComponent1';
import React from 'react'
import MapComponent from '../components/Map';
import { useState } from 'react';
import {API} from '../components/API';


export default function LandingPage () {
    const [location, setLocation] = useState({ lat: null, lng: null });
    console.log(API)
    return (
        <>
            <HomeComponent1 />
            
            <div className='h-8'></div>
            <div className='flex justify-center items-center'>
            <MapComponent setLocation={setLocation}/>
            </div>
            <div className='h-8'></div>

        </>
    );
}