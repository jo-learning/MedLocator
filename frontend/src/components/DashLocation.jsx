import MapComponent from './Map';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSuccess } from '../redux/user/userSlice';
import { API } from '../components/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashLocation () {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [location, setLocation] = useState({ lat: currentUser.message.latitude, lng: currentUser.message.longitude });
  const showToast = (message, type) => {
    // console.log("showing Toast")
    switch(type){
        case 'success':
            toast.success(message)
            break;
        case 'error':
            toast.error(message)
            break;
        case 'info':
            toast.info(message)
            break;
        case 'warning':
            toast.warning(message)
            break;
        default:
            toast(message)
            break;
    }
  }



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
            //   console.log(data.message);
            } else {
              dispatch(updateSuccess(data));
              showToast("successfully Updated", 'success')
              console.log(data)
            }
            showToast({message:"succefully Updated", type:"success"});

        } catch (error) {
            
        }
    }
    
    return (
        <>
        <div className='flex flex-col justify-center items-center lg:ml-[300px]'>
            <MapComponent setLocation={setLocation} location={location} />
            <Button className='bg-blue-500 mt-20' onClick={handleSubmit}>Change the location</Button>
        </div>
        <ToastContainer />
        </>
    )
}