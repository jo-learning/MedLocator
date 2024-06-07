import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashMedicine from '../components/DashMedicine';
import DashLocation from '../components/DashLocation';
import Header from '../components/Header';
import DashSearch from '../components/DashSearch';
import DashRecieved from '../components/DashRecieved';
import DashAdmin from '../components/DashAdmin';
// import DashPosts from '../components/DashPosts';
// import DashUsers from '../components/DashUsers';
// import DashComments from '../components/DashComments';
// import DashboardComp from '../components/DashboardComp';
// import DashShops from '../components/DashShops';
// import DashPlan from '../components/DashPlan';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <>
    <div className='min-h-screen flex flex-col md:flex-row'>
      
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {tab === 'medicine' && <DashMedicine />}
      {tab === 'location' && <DashLocation />}
      {tab === 'search' && <DashSearch />}
      {tab === 'recieved' && <DashRecieved />}
      {tab === 'admin' && <DashAdmin />}
    </div>
    </>
    
  );
}
