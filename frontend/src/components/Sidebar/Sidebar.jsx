
import { Link } from 'react-router-dom';

// Sidebar Component
const Sidebar = () => (
    <div className="w-64 bg-gray-800 text-white h-screen p-5">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <ul className="mt-4 space-y-2">
        <li><Link to="/" className="block p-2 hover:bg-gray-700">Home</Link></li>
        <li><Link to="/reports" className="block p-2 hover:bg-gray-700">Reports</Link></li>
        <li><Link to="/settings" className="block p-2 hover:bg-gray-700">other</Link></li>
      </ul>
    </div>
  );
export default Sidebar