import React from "react";
import './HomeComponent.css'
import image1 from '../../public/image1.jpg';
import image2 from '../../public/image2.jpg';
import image3 from '../../public/image3.jpg';

export default function HomeComponent () {
    return (
        <>
            {/* <!-- Hero Section --> */}
    <section className="bg-cover bg-center h-screen background" >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
            <div className="text-center text-white px-4">
                <h2 className="text-4xl font-bold mb-4">Find the Nearest Pharmacy with the Medicine You Need</h2>
                <p className="text-xl mb-6">Quickly and easily locate pharmacies that have the medicine you're looking for.</p>
                <a href="/dashboard?tab=search" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Search Now</a>
            </div>
        </div>
    </section>

        </>
    );
}