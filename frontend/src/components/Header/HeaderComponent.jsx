import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

const HeaderComponent = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="bg-white text-gray-600 shadow-md h-17 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/ Left Section /}
        <div className="flex items-center space-x-4">
          
          <a href="#" className="hidden md:block hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hidden md:block hover:text-gray-300">
            Contact
          </a>
        </div>

        {/ Right Section /}
        <div className="flex items-center space-x-4">
          {/ Search Input & Toggle /}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none px-2 text-gray-700"
                  autoFocus
                />
                <IoCloseSharp
                  className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={toggleSearch}
                />
              </div>
            ) : (
              <CiSearch
                className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={toggleSearch}
              />
            )}
          </div>

          {/ User Profile /}
          <div className="relative">
            <button className="flex items-center space-x-2">
              <img
                src="/assets/img/user2-160x160.jpg"
                alt="User"
                className="w-8 h-8 rounded-full shadow"
              />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;