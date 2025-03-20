import React, { useState } from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginApi } from '../Api/LoginApi';
import { useNavigate } from 'react-router-dom';
const LoginSignupPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSignupToggle = () => {
    setIsSignup(!isSignup);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
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
  const handlesubmit = async (e) => {
    e.preventDefault();

    // Perform login validation 
      
    const response = await loginApi(email, password, navigate);
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
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
            <button type="button" onClick={handleSignupToggle} className="text-purple-600 font-medium">
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

const SignupForm = ({ handleSignupToggle }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            required
            
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            required
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          Sign Up
        </button>
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