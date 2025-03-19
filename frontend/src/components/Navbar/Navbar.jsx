import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>

      {/* Profile & Settings */}
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-2xl text-gray-600 dark:text-white" />
        <span className="text-gray-900 dark:text-white">Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
