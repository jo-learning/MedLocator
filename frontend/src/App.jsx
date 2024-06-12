// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import { Footer } from 'flowbite-react';
import About from './pages/About';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
