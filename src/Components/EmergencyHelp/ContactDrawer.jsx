import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ContactDrawer = () => {
  const [showContacts, setShowContacts] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const emergencyContacts = useSelector(
    (state) => state.user.EmergencyContacts || []
  );

  // Responsive handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      {!showContacts && (
        <div className="absolute bottom-4 left-[60%] transform -translate-x-1/2 z-50">
          {isMobile ? (
            <div
              onClick={() => setShowContacts(true)}
              className="w-12 h-1.5 bg-gray-300 rounded-full mb-1 cursor-pointer"
            ></div>
          ) : (
            <button
              onClick={() => setShowContacts(true)}
              className="text-sm text-gray-600 hover:text-black transition bg-white"
            >
              View All Emergency Contacts
            </button>
          )}
        </div>
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-lg transition-all duration-500 ease-in-out z-10 ${
          showContacts ? 'translate-y-0' : 'translate-y-[70%]'
        } ${isMobile ? '' : 'max-w-xl mx-auto'}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-lg font-semibold">Emergency Contacts</h4>
            <button
              onClick={() => setShowContacts(false)}
              className="text-xl bg-white text-black font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {emergencyContacts.map((contact, i) => {
              const initials =
                contact.Name?.slice(0, 2).toUpperCase() || 'NA';

              return (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                >
                  <div className="flex items-center justify-evenly  gap-3 md:gap-5">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                      {initials}
                    </div>
                    <span className="text-sm font-bold text-gray-900 pr-4">
                      {contact.Name.toUpperCase() || 'Unknown'}
                    </span>
                     <span className="text-sm font-medium text-gray-600">
                      {contact.PhoneNumber || 'Unknown'}
                    </span>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
