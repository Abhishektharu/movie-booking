import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiFilm, 
  FiMenu, 
  FiLogOut
} from "react-icons/fi";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if(confirm){
      localStorage.removeItem('access-user');
      localStorage.removeItem('user');
      navigate('/user/login', { replace: true });
    }
  }

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all ${collapsed ? "w-20" : "w-64"} flex flex-col shadow-lg`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-semibold">User Panel</h1>}
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-grow">
        <ul className="mt-4 space-y-2">
          <SidebarItem 
            icon={<FiHome className="text-gray-300" />} 
            text="Dashboard" 
            collapsed={collapsed} 
            path="/user/dashboard" 
          />
          
          <SidebarItem 
            icon={<FiFilm className="text-gray-300" />} 
            text="Movies" 
            collapsed={collapsed} 
            path="/user/all-movies" 
          />
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 hover:bg-gray-700 transition rounded-lg mx-2 w-full text-left"
        >
          <FiLogOut className="text-xl text-gray-300" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, collapsed, path }) => {
  return (
    <Link to={path} className="flex items-center gap-3 p-3 hover:bg-gray-700 transition rounded-lg mx-2">
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{text}</span>}
    </Link>
  );
};

export default Sidebar;
