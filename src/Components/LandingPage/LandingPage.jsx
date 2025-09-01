
import { Shield, Phone, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SubHe } from '../SubHeader';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/userSlice.js';

// const Card = ({ children, className }) => (
//   <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
//     {children}
//   </div>
// );

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.3 },
  }),
};

const cards = [
  {
    icon: <Phone className="text-purple-600 h-12 w-12" />,
    title: '24/7 Emergency Response',
    description: 'Instant access to emergency services and your trusted contacts with one tap',
  },
  {
    icon: <Users className="text-purple-600 h-12 w-12" />,
    title: 'Community Support',
    description: 'Connect with a network of verified users and share real-time safety alerts',
  },
  {
    icon: <BookOpen className="text-purple-600 h-12 w-12" />,
    title: 'Safety Resources',
    description: 'Access self-defense tutorials, safety tips, and educational materials',
  },
];

const LandingPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(()=>{
    try {
      const fetchUserData = async()=>{
        const data = await axios.get(`${backendUrl}/user`);


      }
      
    } catch (error) {
      console.log(error)
      
    }

  })
  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <Shield className="text-purple-700 h-8 w-8" />
          <span className="text-xl font-bold text-purple-800">SafeGuard</span>
        </div>
        <div className="flex space-x-6">
          <button className="text-purple-800 bg-white hover:text-purple-600 transition focus:outline-none focus:ring-0">Features</button>
          <button className="text-purple-800 bg-white hover:text-purple-600 transition focus:outline-none focus:ring-0">Resources</button>
          <button className="text-purple-800 bg-white hover:text-purple-600 transition focus:outline-none focus:ring-0">Contact</button>
          <Link to="/emergency">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Emergency Help
            </button>
          </Link>
          <Link to='/login'>
          <button className="text-gray-600 hover:text-gray-900 bg-white">Login</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-purple-800 mb-6">
            Stay Safe, Stay Connected
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your personal safety companion with real-time protection and community support
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition focus:outline-none focus:ring-0">
                Get Started
              </button>
            </Link>
            <button className="focus:outline-none focus:ring-0 bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-100 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="space-y-4">
                {card.icon}
                <h3 className="text-xl font-semibold text-purple-800">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-50 py-20 ">
        <div className="max-w-4xl mx-auto text-center px-4 ">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">
            Join Our Safety Network Today
          </h2>
          <p className="text-gray-700 mb-8">
            Download our app and become part of a community dedicated to women safety
          </p>
          <Link to="/login">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
      <SubHe/>
    </div>
  );
};

export default LandingPage;
