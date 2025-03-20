import { 
  Shield,  
   
} from 'lucide-react';
import { Link } from 'react-router-dom';


  const Header = () => (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="text-purple-600 h-8 w-8" />
          <span className="text-xl font-bold text-gray-900">SafeGuard</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
        <Link to='/'>
        <button className="text-gray-600 hover:text-gray-900">Home</button></Link>
        <Link to={'/safteytips'}>
        <button className="text-gray-600 hover:text-gray-900">Safety Tips</button></Link>
          <button className="text-gray-600 hover:text-gray-900">Resources</button>
          <button className="text-gray-600 hover:text-gray-900">Emergency</button>
        </div>
      </nav>
    </header>
  );
   export default Header