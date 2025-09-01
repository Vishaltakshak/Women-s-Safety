import { SubHe } from '../Components/SubHeader';
import Header from '../Components/Header';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

export const UserProfile = () => {
  const [editableSection, setEditableSection] = useState(null);

  const handleEdit = (section) => {
    setEditableSection((prev) => (prev === section ? null : section));
  };

  return (
    <div>
      <Header/>
    <div className="flex flex-col bg-gray-200 md:flex-row min-h-screen pb-16">
      <aside className="w-full md:w-1/4 bg-white p-6 space-y-6 shadow-md">
        <nav className="flex flex-col space-y-4">
          {['My Profile', 'Contacts', 'Change Password', 'Settings'].map((item) => (
            <button
              key={item}
              className="text-left bg-white w-full py-3 px-4 text-gray-700 rounded hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-300-l-4 border border-gray-300-transparent hover:border border-gray-300-blue-600"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      

      <div className="main w-full md:w-3/4 p-6 text-gray-700">
        <form className="space-y-6">
          <div className="profile bg-white py-4 px-4 flex justify-between items-center">
            <div className="left flex flex-col justify-center items-center space-y-2 text-center">
              <img src="/avatar-placeholder.png" alt="User Avatar" className="w-20 h-20 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-lg">Name</p>
                <p className="text-gray-500 bg-white h-[2rem] text-sm">State</p>
              </div>
            </div>
            <div className="right">
              <button type="button" onClick={() => handleEdit('profile')} className="flex items-center text-gray-500 bg-white h-[2rem]">
                <Pencil className="mr-1 h-[2rem] w-[1rem]" /> Edit
              </button>
            </div>
          </div>
        

          <div className="information bg-white p-6 rounded shadow ">
          
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <hr className="mb-4" />

            <div className="infoForm space-y-6">
              <div className="name grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">First Name</label>
                  <input type="text" disabled={editableSection !== 'profile'} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Last Name</label>
                  <input type="text" disabled={editableSection !== 'profile'} className="w-full p-2 border border-gray-300 rounded" />
                </div>
              </div>

              <div className="contact space-y-4 mb-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Contact Details</h3>
                  <button type="button" onClick={() => handleEdit('contact')} className="text-gray-500 bg-white h-[2rem] flex items-center">
                    <Pencil className="mr-1 h-[2rem] w-[1rem]" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mail">
                    <label className="block mb-1 font-medium">Email</label>
                    <input type="email" disabled={editableSection !== 'contact'} className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div className="phone">
                    <label className="block mb-1 font-medium">Phone</label>
                    <input type="text" disabled={editableSection !== 'contact'} className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </div>
           

            
          </div>


          <div className='bg-white mt-8 py-4 px-4 '>
              <div className="address space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Address</h3>
                  <button type="button" onClick={() => handleEdit('address')} className="text-gray-500 bg-white h-[2rem] flex items-center">
                    <Pencil className="mr-1 h-[2rem] w-[1rem]" /> Edit
                  </button>
                </div>
                <label className="block mb-1 font-medium">Address</label>
                <input type="text" disabled={editableSection !== 'address'} className="w-full p-2 border border-gray-300 rounded" />
              </div>
        <button className="mt-4 w-auto py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200">
           Save Changes
        </button>
          </div>
           
          
        </form>
      </div>

      {/* Mobile View Duplicate */}
      <div className="md:hidden p-4 bg-white mt-6 rounded shadow">
        <form className="space-y-4">
          <div className="text-center">
            <img src="/avatar-placeholder.png" className="mx-auto w-24 h-24 rounded-full object-cover mb-2" alt="User" />
            <p className="text-lg font-semibold">Name</p>
            <p className="text-gray-500 bg-white h-[2rem]">State</p>
          </div>
          {['First Name', 'Last Name', 'Email', 'Phone', 'Address'].map((label) => (
            <div key={label}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                disabled
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button className="w-full py-2 bg-blue-600 text-white rounded mt-4">Save Changes</button>
        </form>
        
      </div>
      <SubHe/>
    </div>
  </div>
  );
};