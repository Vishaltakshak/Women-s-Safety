import { useState } from "react";

import { SubHeader } from "../Components/EmergencyHelp/SubHeader.jsx";
import { EmergencyContacts } from "../Components/EmergencyHelp/EmergencyContacts.jsx"
import { SosButton } from "../Components/EmergencyHelp/SosButton.jsx";
import { ContactDrawer } from "../Components/EmergencyHelp/ContactDrawer.jsx";
import { SubHe } from "../Components/SubHeader.jsx";
import Header from "../Components/Header.jsx";



const EmergencyHelp = () => {

  return (
    <div className="min-h-screen bg-white px-4 pt-8 pb-24 font-sans text-gray-900 relative overflow-hidden pb-20">
      <Header/>
      {/* Header */}
      <SubHeader />
      {/* Emergency Contacts Preview */}
      <EmergencyContacts/>
      {/* SOS Button */}
      <SosButton/>
      {/* Contact Drawer Toggle */}
      <ContactDrawer />
      {/* <SubHe/> */}
      
    </div>
  );
};

export default EmergencyHelp;
