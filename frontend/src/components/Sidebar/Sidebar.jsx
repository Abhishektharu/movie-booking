import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiFilm, FiUsers, FiSettings, FiMenu, FiLogOut, FiPlus, FiEdit } from "react-icons/fi";


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [moviesOpen, setMoviesOpen] = useState(false); // State for movies submenu

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  //navigate
  const navigate = useNavigate();

  

  const handleLogout = ()=>{

    //add confirmation
    const confirm = window.confirm("Are you sure you want to logout?");
    if(confirm){

      //clear the data
      localStorage.removeItem('access-admin');
      localStorage.removeItem('admin');
      
      navigate('/admin/login', { replace: true });
    }
  }

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
          <SidebarItem icon={<FiHome />} text="Dashboard" collapsed={collapsed} path="/admin/dashboard" />
          
          {/* Movies Section with Dropdown */}
          <li>
            <button
              onClick={() => setMoviesOpen(!moviesOpen)}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-700 transition rounded-lg mx-2"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl"><FiFilm /></span>
                {!collapsed && <span className="text-sm font-medium">Movies</span>}
              </div>
              {!collapsed && (
                <span className={`transform ${moviesOpen ? "rotate-90" : ""} transition-transform`}>
                  ▶
                </span>
              )}
            </button>

            {/* Submenu for Movies */}
            {moviesOpen && !collapsed && (
              <ul className="ml-6 space-y-2">
                <SidebarSubItem text="All Movies" path="/" />
                <SidebarSubItem text="Add Movie" path="/admin/movies/add" icon={<FiPlus />} />
                <SidebarSubItem text="Edit Movie" path="/admin/movies/edit" icon={<FiEdit />} />
              </ul>
            )}
          </li>

          <SidebarItem icon={<FiUsers />} text="Users" collapsed={collapsed} path="/admin/users" />
          <SidebarItem icon={<FiSettings />} text="Settings" collapsed={collapsed} path="/admin/settings" />
          <SidebarItem  text="Shows" collapsed={collapsed} path="/admin/add-show" />
          <SidebarItem  text="Theater" collapsed={collapsed} path="/admin/add-theater" />
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button onClick={handleLogout}className="flex items-center gap-3 p-3 hover:bg-gray-700 transition rounded-lg mx-2 w-full text-left"
        >
          <FiLogOut className="text-xl" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        
        </button>
        </div>
    </div>
  );
};

// Sidebar Item Component (Main Items)
const SidebarItem = ({ icon, text, collapsed, path }) => {
  return (
    <Link to={path} className="flex items-center gap-3 p-3 hover:bg-gray-700 transition rounded-lg mx-2">
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{text}</span>}
    </Link>
  );
};

// Sidebar Sub Item Component (Nested Items)
const SidebarSubItem = ({ text, path, icon }) => {
  return (
    <Link to={path} className="flex items-center gap-3 p-2 pl-5 hover:bg-gray-700 transition rounded-lg">
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
};

export default Sidebar;
