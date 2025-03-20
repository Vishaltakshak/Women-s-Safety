import React from 'react';
import { Shield, Phone, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
// Simple Card component replacement
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Shield className="text-purple-600 h-8 w-8" />
          <span className="text-xl font-bold text-purple-900">SafeGuard</span>
        </div>
        <div className="flex space-x-6">
          <button className="text-purple-900 hover:text-purple-700">Features</button>
          <button className="text-purple-900 hover:text-purple-700">Resources</button>
          <button className="text-purple-900 hover:text-purple-700">Contact</button>
          
          <Link to="/emergency">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          
          
          >
            Emergency Help
          </button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-purple-900 mb-6">
            Stay Safe, Stay Connected
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your personal safety companion with real-time protection and community support
          </p>
          <div className="flex justify-center space-x-4">
            <Link to='/login'>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700">
              Get Started
            </button></Link>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index} // Pass the index as custom prop for delay calculation
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
              className="p-6 bg-white rounded-lg shadow-lg"
            >

              <div className="space-y-4">
                {card.icon}
                <h3 className="text-xl font-bold text-purple-900">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            Join Our Safety Network Today
          </h2>
          <p className="text-gray-600 mb-8">
            Download our app and become part of a community dedicated to women's safety
          </p>
          <Link to='/login'>
           
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700">
            Get Started Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;