import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiFilm, 
  FiUsers, 
  FiSettings, 
  FiMenu, 
  FiLogOut, 
  FiPlus, 
  FiEdit,
  FiClock,
  FiMapPin,
  FiChevronRight,
  FiList,
  FiPlusCircle,
  FiMail
} from "react-icons/fi";
import { MdTheaterComedy } from "react-icons/md";

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
          
          {/* Movies Section with Dropdown */}
          <li>
            <button
              onClick={() => setMoviesOpen(!moviesOpen)}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-700 transition rounded-lg mx-2"
            >
              <div className="flex items-center gap-3">
                <FiFilm className="text-xl text-gray-300" />
                {!collapsed && <span className="text-sm font-medium">Movies</span>}
              </div>
              {!collapsed && (
                <FiChevronRight 
                  className={`transform transition-transform duration-200 ${
                    moviesOpen ? "rotate-90" : ""
                  }`}
                />
              )}
            </button>

            {/* Submenu for Movies */}
            {moviesOpen && !collapsed && (
              <ul className="ml-6 space-y-2">
                <SidebarSubItem icon={<FiList />} text="All Movies" path="/admin/all-movies" />
                <SidebarSubItem icon={<FiPlusCircle />} text="Add Movie" path="/admin/movies/add" />
              </ul>
            )}
          </li>

          <SidebarItem 
            icon={<FiUsers className="text-gray-300" />} 
            text="Users" 
            collapsed={collapsed} 
            path="/admin/users" 
          />
          
          {/* <SidebarItem 
            icon={<FiSettings className="text-gray-300" />} 
            text="Settings" 
            collapsed={collapsed} 
            path="/admin/settings" 
          /> */}
          
          <SidebarItem 
            icon={<FiClock className="text-gray-300" />} 
            text="Shows" 
            collapsed={collapsed} 
            path="/admin/add-show" 
          />
          
          <SidebarItem 
            icon={<MdTheaterComedy className="text-gray-300 text-xl" />} 
            text="Theater" 
            collapsed={collapsed} 
            path="/admin/add-theater" 
          />

          <SidebarItem 
            icon={<FiMail className="text-gray-300" />} 
            text="Send Email" 
            collapsed={collapsed} 
            path="/admin/send-email" 
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
const SidebarSubItem = ({ icon, text, path }) => {
  return (
    <Link to={path} className="flex items-center gap-3 p-2 pl-5 hover:bg-gray-700 transition rounded-lg">
      {icon && <span className="text-lg text-gray-300">{icon}</span>}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
};

export default Sidebar;
