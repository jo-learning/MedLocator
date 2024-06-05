import MapComponent from './Map';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSuccess } from '../redux/user/userSlice';
import { API } from '../components/API';

export default function DashLocation () {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
    const [location, setLocation] = useState({ lat: currentUser.message.latitude, lng: currentUser.message.longitude });
    const handleSubmit = async() =>{
        try {
            const update = {
                name: currentUser.message.name,
                email: currentUser.message.email,
                token: currentUser.message.token,
                latitude: location.lat,
                longitude: location.lng
            }
            const res = await fetch(`${API}/api/user/updateLocation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update),
            });
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
            } else {
              dispatch(updateSuccess(data));
              console.log(data)
            }
        } catch (error) {
            
        }
    }
    
    return (
        <>
        <div className='flex flex-col justify-center items-center lg:ml-[300px]'>
            <MapComponent setLocation={setLocation} location={location} />
            <Button className='bg-blue-500 mt-20' onClick={handleSubmit}>Change the location</Button>
        </div>
        </>
    )
}