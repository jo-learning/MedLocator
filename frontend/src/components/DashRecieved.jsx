import { Modal, Button, Label, Select, TextInput, Spinner } from 'flowbite-react';
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiDocumentAdd, HiOutlineExclamationCircle } from 'react-icons/hi';
import MapComponent3 from './Map3';
import { API } from '../components/API';


// import { set } from 'mongoose';

export default function DashRecieved() {
  const { currentUser } = useSelector((state) => state.user);
  // const currentUser = {
  //   _id: "11223344",
  //     username: "yohannes",
  //     email: "yohannesguesh01@gmail.com",
  //     isAdmin: true
  // }
  const [userPosts, setUserPosts] = useState([]);
//   const userPosts = [{
//     updatedAt: "24-20-2014",
//     category: "post",
//     _id: 2,
//     title: "abcd"

//   },
//   {
//     updatedAt: "24-20-2014",
//     category: "post",
//     _id: 1,
//     title: "abcd"

//   },
//   {
//     updatedAt: "24-20-2014",
//     category: "post",
//     _id: 3,
//     title: "abcd"

//   }
// ]
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
//   const [detail, setDetail] = useState(false);
  const [postIndex, setPostIndex] = useState(0);
  const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();


//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.password || formData.location == null) {
//       return setErrorMessage('Please fill out all fields.');
//     }
//     try {
//       setLoading(true);
//       setErrorMessage(null);
//       console.log(formData);
      
//       const res = await fetch('https://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         return setErrorMessage(data.message);
//       }
//       setLoading(false);
//       if(res.ok) {
//         navigate('/sign-in');
//       }
//     } catch (error) {
//       setErrorMessage(error.message);
//       setLoading(false);
//     }
//   };


  useEffect(() => {
    const fetchPosts = async () => {
      console.log('any thing')
      try {
        const res = await fetch(`${API}/api/save/getSave`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({token: currentUser.message.token, email: currentUser.message.email}),
        });
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data);
          console.log(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.message) {
      fetchPosts();
    }
  }, []);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        // setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/$postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        // setUserPosts((prev) =>
        //   prev.filter((post) => post._id !== postIdToDelete)
        // );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='mt-20 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.message && userPosts.length > 0 ? (
        <>
        {/* <div className=' items-end justify-end flex'>
        <Button className='bg-red-500 right-0' onClick={() => (setDetail(true))}><HiDocumentAdd className='w-6 h-6' /> add medicine</Button>
        </div> */}
        



        <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Pharmacy Name</Table.HeadCell>
              <Table.HeadCell>Map</Table.HeadCell>
            </Table.Head>
            {userPosts.map((user, index) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {user[0]}
                  </Table.Cell>
                  <Table.Cell>
                    {user[0]}
                  </Table.Cell>
                  <Table.Cell>
                  <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIndex(index);
                      }}
                      className='font-medium text-teal-500 hover:underline cursor-pointer px-6'
                    >
                      Map
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            {/* <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' /> */}
            {
              userPosts[postIndex] && (
            <MapComponent3 pharmacy_postion={[userPosts[postIndex][2], userPosts[postIndex][3]]}/>

              )
            }
            {/* <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
