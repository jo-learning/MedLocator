import { Alert, Button, Label, Spinner, TextInput, Select, Modal } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MapComponent from '../components/Map';
import { FaCheckCircle } from 'react-icons/fa';
// import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Check, setCheck] = useState(false);

  const [location, setLocation] = useState({ lat: null, lng: null });

  // console.log(location)
  // setFormData({ ...formData, role: 'user' });

  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('user')

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || formData.location == null) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      console.log(formData);
      
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen pt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
        <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-gray-100 to-red-500 rounded-lg text-white'>
          MedLocator <span className='text-red-500'><b></b></span>
        </span>
      </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='name'
                onChange={handleChange}
                className='dark:text-black'
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='user type'></Label>
            <Select defaultValue="user" onChange={(event) => {
              setModalPlacement(event.target.value)
              setFormData({ ...formData, role: event.target.value });
            }}>
            <option value="user">User</option>
            <option value="pharmacy">Pharmacy</option>
            
          </Select>
            </div>
            
              
            
            {/* <Button onClick={()=>{setShowPopup(true)}} className='ml-1 text-start bg-red-600'>
              Subscription
            </Button> */}
            {/* {showPopup && <SubscriptionPopup onClose={() => setShowPopup(false)} />} */}
            {/* <SubscriptionPopup /> */}
            <Button
            className='bg-red-500'
            onClick={() => {setOpenModal(true)}}
            >
              {Check == true && <span className='mr-2'><FaCheckCircle size={30} color="green" /></span>}
              Add Location
            </Button>

            <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
        // className='lg:my-[100px] lg:mx-[300px] bg-black'
      >
        <Modal.Header>Small modal</Modal.Header>
        <Modal.Body>
          <MapComponent setLocation={setLocation}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            setOpenModal(false)
            // var locations = location.lat + ' ' + location.lng;

            setCheck(true);
            setFormData({ ...formData, longitude: parseInt(location.lng), latitude: location.lat });
          }}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>


            <Button
              className='bg-red-500'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            {/* <OAuth /> */}
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-red-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
