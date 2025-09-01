import  { useState } from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginApi } from '../Api/LoginApi';
import { useNavigate } from 'react-router-dom';
import { signupApi } from '../Api/SignUpApi.jsx';

// import { uploadImageToSupabase } from '../utils/uploadImageToSupabase';

// const handleImageChange = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const publicUrl = await uploadImageToSupabase(file, 'users/');
  
//   if (publicUrl) {
//     console.log("✅ Image uploaded at:", publicUrl);

//     // Now send this URL to your backend via Axios or Fetch
//     await axios.put('/api/user/update', {
//       userId,
//       imgURL: publicUrl,
//     });
//   }
// };

const LoginSignupPage = () => {
  const [isSignup, setIsSignup] = useState(false);
 

  const handleSignupToggle = () => {
    setIsSignup(!isSignup);
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white shadow-md  bg-gradient-to-b from-purple-200 to-white">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="text-purple-600 h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">SafeGuard</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/">
              <button className="text-white bg-purple-400 px-4 py-2 rounded-lg hover:scale-105 hover:bg-purple-500">Home</button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          {isSignup ? (
            <SignupForm handleSignupToggle={handleSignupToggle} />
          ) : (
            <LoginForm handleSignupToggle={handleSignupToggle} />
          )}
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-auto py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 SafeGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const LoginForm = ({ handleSignupToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlesubmit = async (e) => {
    e.preventDefault();

 
    const response = await loginApi(email, password, navigate, dispatch);
    if(!response){
      setError('Invalid email or password');
      console.log(response);
      return;}
  }
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Login</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg"
          onClick={handlesubmit}
        >
          Login
        </button>
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button type="button" onClick={handleSignupToggle} className="text-purple-600 bg-white font-medium ">
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </>
  );
};





import {  useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import { uploadImageToSupabase } from '../Shared/uploadimg.js';


import { useRef } from 'react';
import { useDispatch } from 'react-redux';


export const SignupForm = ({ handleSignupToggle }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Mail: '',
    Password: '',
    Username: '',
    PhoneNumber: '',
    Address: '',
    EmergencyContacts: [],
    imgURL: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);

  const fileInputRef = useRef();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleImageUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  };

  const uploadCroppedImage = async () => {
    setLoadingImg(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], 'cropped.jpeg', { type: 'image/jpeg' });
      const publicUrl = await uploadImageToSupabase(croppedFile);
      if (publicUrl) setFormData(prev => ({ ...prev, imgURL: publicUrl }));
    } catch (err) {
      console.error(err);
    }
    setImageSrc(null);
    setLoadingImg(false);
  };

  const handleAddContact = () => {
    if (contactName && contactPhone) {
      setFormData(prev => ({
        ...prev,
        EmergencyContacts: [...prev.EmergencyContacts, { Name: contactName, PhoneNumber: contactPhone }]
      }));
      setContactName('');
      setContactPhone('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await signupApi(formData);
      if (res && res.user) {
        setSuccess('Signup successful!');
        console.log(res);
        setFormData({ Name: '', Mail: '', Password: '', Username: '', PhoneNumber: '', Address: '', EmergencyContacts: [], imgURL: '' });
      } else {
        setError('Signup failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h1>

      {imageSrc && (
        <div className="relative w-full h-80 bg-black mb-4">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <button onClick={uploadCroppedImage} className="absolute bottom-2 right-2 bg-purple-600 text-white px-4 py-1 rounded">
            Crop & Upload
          </button>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="">Profile Picture</label>
        <input type="file"  accept="image/*" placeholder='Select a profile image...' ref={fileInputRef} onChange={handleImageUpload} className="w-full text-black bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200cursor-pointer" />
        {loadingImg && <p className="text-purple-600">Uploading image...</p>}
        {formData.imgURL && <img src={formData.imgURL} alt="Profile" className="w-20 h-20 rounded-full" />}

        {['Name', 'Mail', 'Password', 'Username', 'PhoneNumber', 'Address'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-gray-700 font-medium mb-2">
              {field}
            </label>
            <input
              type={field === 'Password' ? 'password' : 'text'}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full text-black bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-medium mb-2">Add Emergency Contact</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded text-black"
            />
            <button type="button" onClick={handleAddContact} className="bg-purple-600 text-white px-3 py-2 rounded">
              Add
            </button>
          </div>
        </div>

        {formData.EmergencyContacts.length > 0 && (
          <ul className="list-disc pl-6 text-gray-800">
            {formData.EmergencyContacts.map((c, idx) => (
              <li key={idx}>{c.Name} - {c.PhoneNumber}</li>
            ))}
          </ul>
        )}

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg">
          Sign Up
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button type="button" onClick={handleSignupToggle} className="text-purple-600 font-medium">
              Login
            </button>
          </p>
        </div>
      </form>
    </>
  );
};







export default LoginSignupPage;