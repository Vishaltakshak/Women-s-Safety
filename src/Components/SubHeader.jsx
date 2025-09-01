
import { House, Siren, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
export const SubHe = () => {
  return (
    <div className="fixed bottom-4 left-[85%] transform -translate-x-1/2 w-[90%] max-w-[70%] h-[60px] backdrop-blur-md bg-white/30 border border-gray-200 rounded-full flex justify-around items-center px-4 shadow-lg z-50">
      <Link to='/'>
        <button className="bg-transparent text-gray-600 hover:border-b-4 border-0 hover:text-gray-800 transition">
          <House size={24} />
        </button>
      </Link>
      <Link to="/emergency">
        <button className=" bg-transparent text-gray-600 hover:border-b-4 border-0 hover:text-gray-800 transition">
          <Siren size={24} />
        </button>
      </Link>
      <Link to="/help">
        <button className="bg-transparent text-gray-600 hover:border-b-4 border-0 hover:text-gray-800 transition">
          <Shield size={24} />
        </button>
      </Link>
      <Link to="/userprofile">
        <button className="bg-transparent text-gray-600 hover:border-b-4 border-0 hover:text-gray-800 transition">
          <User size={24} />
        </button>
      </Link>
    </div>
  );
};
