import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'regenerator-runtime/runtime';

import LandingPage from './Components/LandingPage/LandingPage.jsx';
import EmergencyPage from './Pages/EmergencyHelp.jsx';
import SafetyTipsPage from './Pages/SafteyTips.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import AlertContactsPage from './Pages/AlertContacts.jsx';
import {UserProfile} from './Pages/ProfilePage';
import { useSelector } from 'react-redux';
import { useAutoLocationUpdater } from './Api/UpdateLocation';
import { SosPage } from './Pages/SosPage';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNearbySos } from './Api/FindNearBySos';
function App() {
   const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => console.error(err)
    );
  }, []);

  const sosList = useNearbySos(location?.lat, location?.lng);

  useEffect(() => {
    if (sosList.length > 0) {
      toast.error(`🚨 New SOS from ${sosList[0].name || "Unknown"}!`);
    }
  }, [sosList]);

  const user = useSelector((state) => state.user); 
  useAutoLocationUpdater(user?._id); 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/emergency' element={<EmergencyPage />} />
          <Route path='/safteytips' element={<SafetyTipsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/alertcontacts' element={<AlertContactsPage />} />
          <Route path='/userprofile' element={<UserProfile/>}/>
          <Route path='/help' element={<SosPage/>}></Route>
    
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
