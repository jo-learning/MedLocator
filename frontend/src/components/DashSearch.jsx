import { TextInput, Modal, Button, Spinner } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import MapComponent from "./Map";
import MapComponent2 from "./Map2";
import { useSelector } from "react-redux";
import { HiDocumentText, HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiArrowNarrowDown } from "react-icons/hi";
import MapComponent3 from "./Map3";
import { API } from '../components/API';
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import PopupModal from "./PopUp";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { current } from "@reduxjs/toolkit";

export default function DashSearch(){
    const { currentUser} = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState()
    const [detail, setDetail] = useState(false)
    const [number, setNumber] = useState(0)
    var loc = {lat: null, lng: null}
    const [medicine, setMedicine] = useState([]);
    const [popup, setPopUp] = useState({
      shows: null,
      message: null,
      statusCode: null
    })
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
    // const medicines = [
    //     {
    //         name: "parasintamol",
    //         pharmacy_id: "122",
    //         medicine_id: "223",
    //         verified: true,
    //         pharmacy: "berry",
    //         location: "13.487177181316815, 39.46855545043946",
    //         updatedAt: "20-22-2004"        
    //     },
    //     {
    //         name: "parasintamol",
    //         pharmacy_id: "122",
    //         medicine_id: "223",
    //         verified: true,
    //         pharmacy: "gooog",
    //         location: "23.43332 21.22332",
    //         updatedAt: "20-22-2004"        
    //     },
    //     {
    //         name: "parasintamol",
    //         pharmacy_id: "122",
    //         medicine_id: "223",
    //         pharmacy: "zara",
    //         verified: true,
    //         location: "13.487177181316815, 39.46855545043946",
    //         updatedAt: "20-22-2004"        
    //     },
    //     {
    //         name: "parasintamol",
    //         pharmacy_id: "122",
    //         medicine_id: "223",
    //         pharmacy: "zara",
    //         verified: false,
    //         location: "23.43332 21.22332",
    //         updatedAt: "20-22-2004"        
    //     }
    // ]

    const handleSave = async(e) => {
      try {
        // e.preventDefault();
        console.log({email: currentUser.message.email, medicine_name: medicine[number][0], latitude: medicine[number][1], longitude: medicine[number][2], pharmacy_name: medicine[number][5], token: currentUser.message.token  })
        const res = await fetch(`${API}/api/save/addSave`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email: currentUser.message.email, medicine_name: medicine[number][0], latitude: medicine[number][1], longitude: medicine[number][2], pharmacy_name: medicine[number][5], token: currentUser.message.token  })
        })
        const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
            } else {
              // dispatch(updateSuccess(data));
              // console.log(data)
              // console.log(data.status)
              showToast('successfully added', 'success');
              // setMedicine(data)
            }
      } catch (error) {
        console.log(error)
      }
    }
    const handleSubmit =  async(e) => {
      try {
        setLoading(true);
        e.preventDefault();
        console.log(searchTerm)
        const res = await fetch(`${API}/api/medicine/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({token:currentUser.message.token, searchTerm: searchTerm}),
            });
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
              setLoading(false);
            } else {
              // dispatch(updateSuccess(data));
              console.log(data)
              setMedicine(data)
              setLoading(false)
            }
      } catch (error) {
      }
    }
    return(
        <div className="justify-center items-center">
        <form onSubmit={handleSubmit} className="items-center justify-center flex">
          {!loading ? (
            <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='lg:w-[250px] '
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          ):
          (
            <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={Spinner}
            className='lg:w-[250px] '
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          )
          }
        
      </form>
      <div>
      <div className='flex-wrap flex gap-4 justify-center'>
        {medicine.map((medicine, index) => (
            <a onClick={()=> {
                setNumber(index)
                setDetail(true)
            }} key={index}>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-[500px] w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>pharmacy: {medicine[5]}</h3>
                <p className='text-2xl'>{medicine[0]}</p>
              </div>
              <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className='flex  gap-2 text-sm'>
                {medicine[3] && (<span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                verified
              </span>)
                }
                {!medicine[3] && (<span className='text-red-500 flex items-center'>
                <HiArrowNarrowDown />
                Not verified
              </span>)
                }
              
              <div className='text-gray-500'>{medicine[4]} km</div>
            </div>
          </div>
            </a>
            
        ))}
        
        {/* <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Comments
              </h3>
              <p className='text-2xl'>totalComments</p>
            </div>
            <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              lastMonthComments
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>totalPosts</p>
            </div>
            <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              lastMonthPosts
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div> */}
      </div>
      </div>
      {
        medicine[number] && (
          <Modal
        show={detail}
        position='center'
        onClose={() => setDetail(false)}
        className='lg:my-[100px] lg:mx-[300px] pb-20 bg-black'
      >
        <Modal.Header>Medicine Name:  {medicine[number][0]}</Modal.Header>
        <Modal.Body>
          <h1> <b>Distance:</b>  {medicine[number][4]} km</h1>
          <h1> <b>Price</b>  {medicine[number][4]} km</h1>
          {/* <MapComponent2 loc={medicine[number]}/> */}
          {medicine[number] && (
          <MapComponent3 pharmacy_postion={[medicine[number][1], medicine[number][2] ]} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            
            handleSave()
            setDetail(false)
            // setDetail(false)
          }} className="bg-green-500">Save</Button>
          <Button color="gray" onClick={() => setDetail(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
        )
      }
      <ToastContainer />
      
      
        </div>
    );
}