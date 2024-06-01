import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2 bg-red-500'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-gray-100 to-red-500 rounded-lg text-white'>
          MedLocator <span className='text-red-500'><b></b></span>
        </span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <button
          className='w-12 h-10 hidden sm:inline bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white hover:from-purple-500 hover:via-pink-600 hover:to-red-600 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 rounded-full'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            {/* <Button gradientDuoTone='pinkToOrange' outline>
              Sign In
            </Button> */}
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign In</button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/' style={{ color: location.pathname === '/' ? 'black' : 'white' }}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about' style={{ color: location.pathname === '/about' ? 'black' : 'white' }}>About</Link>
        </Navbar.Link>
        {/* <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link> */}
        {/* <Navbar.Link active={path === '/shop'} as={'div'}>
          <Link to='/shop'  style={{ color: location.pathname === '/shop' ? 'black' : 'white' }}>Shop</Link>
        </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>


    // <Navbar fluid rounded>
    //   <Navbar.Brand href="https://flowbite-react.com">
    //     <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
    //     <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
    //   </Navbar.Brand>
    //   <div className="flex md:order-2">
    //     <Dropdown
    //       arrowIcon={false}
    //       inline
    //       label={
    //         <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
    //       }
    //     >
    //       <Dropdown.Header>
    //         <span className="block text-sm">Bonnie Green</span>
    //         <span className="block truncate text-sm font-medium">name@flowbite.com</span>
    //       </Dropdown.Header>
    //       <Dropdown.Item>Dashboard</Dropdown.Item>
    //       <Dropdown.Item>Settings</Dropdown.Item>
    //       <Dropdown.Item>Earnings</Dropdown.Item>
    //       <Dropdown.Divider />
    //       <Dropdown.Item>Sign out</Dropdown.Item>
    //     </Dropdown>
    //     <Navbar.Toggle />
    //   </div>
    //   <Navbar.Collapse>
    //     <Navbar.Link href="#" active>
    //       Home
    //     </Navbar.Link>
    //     <Navbar.Link href="#">About</Navbar.Link>
    //     <Navbar.Link href="#">Services</Navbar.Link>
    //     <Navbar.Link href="#">Pricing</Navbar.Link>
    //     <Navbar.Link href="#">Contact</Navbar.Link>
    //   </Navbar.Collapse>
    // </Navbar>

  );
}
