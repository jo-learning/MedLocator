import Header from '../components/Header'
import Footer from '../components/Footer'
// import HomeComponent from '../components/HomeComponent';
import React from 'react'
import MapComponent from '../components/Map';
import { useState } from 'react';


export default function About () {
    const [location, setLocation] = useState({ lat: null, lng: null });
    console.log(location)
    return (
        <>

            {/* <HomeComponent /> */}
            <section id="about" className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">About MedLocator</h2>
            <p className="text-lg lg:mx-[250px]">MedLocator is your go-to solution for finding the nearest pharmacies that stock the medicine you need. Our easy-to-use platform ensures that you get the right medicine at the right time without any hassle.</p>
        </div>
    </section>
            
            <div className='h-8'></div>
            <div className='flex justify-center items-center'>
            <MapComponent setLocation={setLocation}/>
            </div>
            <div className='h-8'></div>

        </>
    );
}