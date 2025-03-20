import React, { useState } from 'react';
import { 
  Shield, 
  Home, 
  Navigation, 
  Car, 
  Smartphone, 
  Users, 
  AlertTriangle,
  ChevronDown,
  Search,
  Bookmark,
  Share2,
  ThumbsUp
} from 'lucide-react';

import Header from '../Components/Header';



const TipCard = ({ icon: Icon, title, description, tips }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Icon className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-600">{description}</p>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-sm text-purple-600">
                  {index + 1}
                </div>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-end space-x-4 mt-4 pt-4 border-t">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const EmergencyBanner = () => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4">
    <div className="flex items-center">
      <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
      <div>
        <h4 className="text-red-800 font-medium">In case of emergency</h4>
        <p className="text-red-700">Call emergency services immediately: 911</p>
      </div>
      <button className="ml-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Get Help Now
      </button>
    </div>
  </div>
);

const SafetyTipsPage = () => {
  const tipCategories = [
    {
      icon: Home,
      title: "Home Safety",
      description: "Essential tips for staying safe at home and maintaining home security.",
      tips: [
        "Always keep doors and windows locked, even when you're home",
        "Install security cameras and ensure proper lighting around entrances",
        "Never share on social media when you're away from home",
        "Have an emergency exit plan and share it with trusted neighbors",
        "Keep emergency contacts easily accessible"
      ]
    },
    {
      icon: Navigation,
      title: "Outdoor Safety",
      description: "Stay safe while walking, jogging, or spending time outdoors.",
      tips: [
        "Stay aware of your surroundings and avoid distractions like headphones",
        "Walk confidently and stay in well-lit, populated areas",
        "Share your location with trusted contacts when out alone",
        "Carry a personal alarm or safety device",
        "Trust your instincts - if something feels wrong, leave the area"
      ]
    },
    {
      icon: Car,
      title: "Travel Safety",
      description: "Tips for staying safe while traveling or commuting.",
      tips: [
        "Always check your car before entering and lock doors immediately",
        "Park in well-lit areas and have keys ready before reaching your car",
        "Share your travel plans with trusted contacts",
        "Use reputable transportation services and verify driver details",
        "Keep emergency supplies in your car"
      ]
    },
    {
      icon: Smartphone,
      title: "Digital Safety",
      description: "Protect yourself online and use technology for safety.",
      tips: [
        "Enable two-factor authentication on all accounts",
        "Be careful about sharing personal information online",
        "Regularly update your safety apps and phone software",
        "Use strong, unique passwords for all accounts",
        "Be cautious with location sharing on social media"
      ]
    },
    {
      icon: Users,
      title: "Social Safety",
      description: "Stay safe in social situations and public gatherings.",
      tips: [
        "Always meet new people in public places",
        "Keep an eye on your drinks and never leave them unattended",
        "Have a code word with friends for uncomfortable situations",
        "Trust your instincts about people and situations",
        "Have a backup plan for getting home safely"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Tips & Guidelines</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your comprehensive guide to personal safety. Learn essential tips and best practices to stay safe in various situations.
          </p>
        </div>

        
        
        <EmergencyBanner />

        <div className="mt-12 space-y-6">
          {tipCategories.map((category, index) => (
            <TipCard key={index} {...category} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 SafeGuard. Download our app for more safety features and tips.</p>
        </div>
      </footer>
    </div>
  );
};

export default SafetyTipsPage;