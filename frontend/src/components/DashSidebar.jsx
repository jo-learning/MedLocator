import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { FaListAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
//   const { currentUser, setCurrentUser } = useState({
//     _id: "11223344",
//     username: "yohannes",
//     email: "yohannesguesh01@gmail.com",
//     isAdmin: true
// })
// const currentUser = {
//   _id: "11223344",
//     username: "yohannes",
//     email: "yohannesguesh01@gmail.com",
//     isAdmin: true
// }
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      console.log(currentUser)
      const res = await fetch('http://localhost:5000/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUser.message),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.message && !currentUser.message.isAdmin && (
                      <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item
                          active={tab === 'posts'}
                          icon={HiChartPie}
                          as='div'
                        >
                          Dashboard
                        </Sidebar.Item>
                      </Link>
                    )}

          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.message.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          
          {/* {currentUser.message && !currentUser.message.isAdmin && (
            <Link to='/dashboard?tab=plan'>
              <Sidebar.Item
                active={tab === 'plan'}
                icon={FaListAlt}
                as='div'
              >
                Plan
              </Sidebar.Item>
            </Link>
          )} */}

          {currentUser.message.isAdmin && currentUser.message.role == 'pharmacy' && (
            <Link to='/dashboard?tab=medicine'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Medicine
              </Sidebar.Item>
            </Link>
          )}
          {currentUser && (
            <>
              <Link to='/dashboard?tab=location'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  My Location
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser && !currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=search'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Search
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=recieved'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Recieved
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
