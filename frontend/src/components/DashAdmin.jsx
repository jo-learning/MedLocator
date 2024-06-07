import { Modal, Button, Label, Select, TextInput, Spinner } from 'flowbite-react';
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiDocumentAdd, HiOutlineExclamationCircle } from 'react-icons/hi';
import { API } from '../components/API';

export default function DashAdmin() {
    const { currentUser } = useSelector((state) => state.user);
  // const currentUser = {
  //   _id: "11223344",
  //     username: "yohannes",
  //     email: "yohannesguesh01@gmail.com",
  //     isAdmin: true
  // }
  // const [userPosts, setUserPosts] = useState([]);
  const [userUser, setuserUsers] = useState([]);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState();
  const [formData, setFormData] = useState({});
  const [formMedicine, setFormMedicine] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [editMedicine, setEditMedicine] = useState(false)
  const [medicineIndex, setMedicineIndex] = useState(0)




//   const userUser = [
//     {
//         _id: 1,
//         name: 'yohannes',
//         email: 'yohannes@gmail.com',
//         verified: 1

//     },
//     {
//         _id: 2,
//         name: 'yohannes',
//         email: 'yohannes@gmail.com',
//         verified: 1

//     },
//     {
//         _id: 3,
//         name: 'yohannes',
//         email: 'yohannes@gmail.com',
//         verified: 0

//     },
//     {
//         _id: 4,
//         name: 'yohannes',
//         email: 'yohannes@gmail.com',
//         verified: 0

//     },
//     {
//         _id: 5,
//         name: 'yohannes',
//         email: 'yohannes@gmail.com',
//         verified: 0

//     },
//   ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleMedicineChange = (e) => {
    setFormMedicine({ ...formMedicine, [e.target.id]: e.target.value.trim() });

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || formData.location == null) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      console.log(formData);
      
      const res = await fetch(`${API}/api/auth/signup`, {
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


  const handleAdd = async() => {
    const fetchPosts = async () => {
      
      try {
        const res = await fetch(`${API}/api/medicine/addmedicine`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          console.log(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }



  const handleUpdate = () => {
    console.log(formData)
    const fetchPosts = async () => {
      
      try {
        const res = await fetch(`${API}/api/user/updateuser`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          const res = await fetch(`${API}/api/user/getuser`,  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser.message),
          });
          const data = await res.json();
          if (res.ok) {
            // setUserPosts(data.posts);
            console.log(data)
            setuserUsers(data)
            if (data.length < 9) {
              setShowMore(false);
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }

  useEffect(() => {
    setFormData({ ...formData, token: currentUser.message.token });
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API}/api/user/getuser`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentUser.message),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          console.log(data)
          setuserUsers(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.message.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.message.id]);

  const handleShowMore = async () => {
    const startIndex = userUser.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        // setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
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
        `${API}/api/medicine/deletemedicine/${userIdToDelete}/${currentUser.message.token}`,
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
        const res = await fetch(`${API}/api/medicine/getmedicine`,  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentUser.message),
        });
        const data = await res.json();
        if (res.ok) {
          // setUserPosts(data.posts);
          console.log(data)
          setuserUsers(data)
          if (data.length < 9) {
            setShowMore(false);
          }
        }
        setUserIdToDelete(null)
      }

    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.message.isAdmin && userUser.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Verified</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {userUser.map((user) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {user[1]}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${user.slug}`}>
                      {user[2]}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                    >
                      MAP
                    </Link>
                  </Table.Cell>
                  {
                    user[3] == 1 && (
                        <Table.Cell>
                            <span
                              onClick={() => {
                                setFormData({ ...formData, verified: 0, id: user[0] });
                                handleUpdate()
                              }}
                              className='font-medium text-green-500 hover:underline cursor-pointer'
                            >
                              verified
                            </span>
                        </Table.Cell>
                    )
                  }
                  {
                        user[3] == 0 && (
                  <Table.Cell>
                    
                            <span
                              onClick={() => {
                                setFormData({ ...formData, verified: 1, id: user[0] });
                                handleUpdate()
                              }}
                              className='font-medium text-red-500 hover:underline cursor-pointer'
                            >
                              Verify
                            </span>
                        
                    
                  
                  </Table.Cell>)}
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user[0]);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
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
        <p>You have no users yet!</p>
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
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
