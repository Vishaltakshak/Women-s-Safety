
import { useSelector } from "react-redux";
export const EmergencyContacts = () => {
  const emergencyContacts = useSelector( (state) => state.user.EmergencyContacts || [])
    
  return (
    <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Your Guardians</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {emergencyContacts.map((contact, index) => {
          const initials = contact.Name?.slice(0, 2).toUpperCase() || "NA";
          return (
            <div key={index} className="flex-shrink-0 text-center w-20">
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xl font-bold mx-auto shadow">
                {initials}
              </div>
              <p className="mt-1 text-sm">{contact.Name || "Unknown"}</p>
            </div>
          );
        })}
        </div>
      </div>
  )
}
