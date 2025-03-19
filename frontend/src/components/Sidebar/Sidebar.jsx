import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiFilm, FiUsers, FiSettings, FiMenu, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all ${collapsed ? "w-20" : "w-64"} flex flex-col shadow-lg`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-semibold">Admin Panel</h1>}
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-grow">
        <ul className="mt-4 space-y-2">
          <SidebarItem icon={<FiHome />} text="Dashboard" collapsed={collapsed} path="/admin" />
          <SidebarItem icon={<FiFilm />} text="Movies" collapsed={collapsed} path="/admin/movies" />
          <SidebarItem icon={<FiUsers />} text="Users" collapsed={collapsed} path="/admin/users" />
          <SidebarItem icon={<FiSettings />} text="Settings" collapsed={collapsed} path="/admin/settings" />
          <SidebarItem icon={<FiSettings />} text="Add Movie" collapsed={collapsed} path="/addMovie" />
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <SidebarItem icon={<FiLogOut />} text="Logout" collapsed={collapsed} path="/logout" />
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, collapsed, path }) => {
  return (
    <Link to={path} className="flex items-center gap-3 p-3 hover:bg-gray-800 transition rounded-lg mx-2">
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{text}</span>}
    </Link>
  );
};

export default Sidebar;
