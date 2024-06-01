import MapComponent from './Map';
import { Button } from 'flowbite-react';
import { useState } from 'react';

export default function DashLocation () {
    const [location, setLocation] = useState({ lat: null, lng: null });
    return (
        <>
        <div className='flex flex-col justify-center items-center lg:ml-[300px]'>
            <MapComponent setLocation={setLocation} />
            <Button className='bg-blue-500 mt-20'>Change the location</Button>
        </div>
        </>
    )
}