import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeComponent from '../components/HomeComponent';
import React from 'react'
import MapComponent from '../components/Map';
import { useState } from 'react';
import {API} from '../components/API';


export default function Home () {
    const [location, setLocation] = useState({ lat: null, lng: null });
    console.log(API)
    return (
        <>
            <HomeComponent />
            

        </>
    );
}