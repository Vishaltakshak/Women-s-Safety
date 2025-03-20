import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'regenerator-runtime/runtime';

import LandingPage from './Components/LandingPage/LandingPage.jsx';
import EmergencyPage from './Components/EmergencyHelp/EmergencyHelp.jsx';
import SafetyTipsPage from './Pages/SafteyTips.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import AlertContactsPage from './Pages/AlertContacts.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/emergency' element={<EmergencyPage />} />
        <Route path='/safteytips' element={<SafetyTipsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/alertcontacts' element={<AlertContactsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
