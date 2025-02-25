import { MdDashboard, MdDirectionsBike, MdOutlineProductionQuantityLimits, MdOutlineTour } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaWpforms } from "react-icons/fa6";
import { IoAdd, IoBagAddSharp, IoCloseSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp, IoIosRadioButtonOff } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Sidebar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [productDropdown, setProductDropdown] = useState(true);
  const [bikeDropDown, setBikedropdown] = useState(true);

  const toggleProductDropdown = () => {
    setProductDropdown(!productDropdown);
  }

  const toggleBikeDropDown = () => {
    setBikedropdown(!bikeDropDown);
  }

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="relative">
      {/ Hamburger Menu /}
      <div
        className="absolute top-4 left-4 text-white text-2xl cursor-pointer z-50"
        onClick={toggleSideBar}
      >
        {showSideBar ? <IoCloseSharp /> : <RxHamburgerMenu className="text-black" />}
      </div>

      {/ Sidebar /}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-gray-300 text-sm shadow-lg transition-transform duration-300 ${
          showSideBar ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/ Brand Logo /}
        <div className="flex items-center justify-center py-4 border-b border-gray-700">
          <span className="ml-2 text-lg font-semibold text-white">Xploride</span>
        </div>

        {/ Navigation /}
        <nav className="p-4">
          <ul className="space-y-2">
            {/ Dashboard /}
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
              >
                <MdDashboard className="h-6 w-6" />
                <span className="pl-3">Dashboard</span>
              </a>
            </li>

            {/ Products /}
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
              >
                <div className="flex relative text-center">
                  <MdOutlineProductionQuantityLimits className="h-6 w-6" />
                  <span className="pl-3">Products</span>
                  <span className="mx-18" onClick={toggleProductDropdown}>
                    {productDropdown ?  <IoIosArrowUp className="h-5 w-5 " /> : <IoIosArrowDown className="h-5 w-5 " /> }
                  </span>
                </div>
              </a>

              {productDropdown && 
              <div> 
                  {/ Products Lists /}
                  <li>
                  <a
                    href="#"
                    className="flex items-center px-10 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    <CiViewList className="h-6 w-6" />
                    <span className="pl-3">Product Lists</span>
                  </a>
                </li>

                {/ Add Product /}
                <li>
                  <a
                    href="#"
                    className="flex items-center px-10 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    <IoBagAddSharp className="h-6 w-6" />
                    <span className="pl-3">Add Products</span>
                  </a>
                </li>
              </div>}
            </li>

             {/ Bike Lists /}
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
              >
                <div className="flex relative text-center">
                  <MdDirectionsBike  className="h-6 w-6" />
                  <span className="pl-3">Bikes</span>
                  <span className="mx-25" onClick={toggleBikeDropDown}>
                   {bikeDropDown ?  <IoIosArrowUp className="h-5 w-5"/> :  <IoIosArrowDown className="h-5 w-5"/>}
                  </span>
                </div>
              </a>

               {bikeDropDown && 
               <div>
                 <li>
                  <a
                    href="#"
                    className="flex items-center px-10 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    <CiViewList  className="h-6 w-6" />
                    <span className="pl-3">Bike Lists</span>
                  </a>
                </li>

                <li>
                <a
                  href="#"
                  className="flex items-center px-10 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
                >
                  <IoAdd   className="h-6 w-6" />
                  <span className="pl-3">Add Bike</span>
                </a>
              </li>
                
                
              
              </div>}
            </li>

            {/ Forms /}
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
              >
                <FaWpforms className="h-6 w-6" />
                <span className="pl-3">Forms</span>
              </a>
            </li>

            {/ Button /}
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
              >
                <IoIosRadioButtonOff  className="h-6 w-6" />
                <span className="pl-3">Buttons</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-gray-700 hover:text-white rounded-md"
              >
                <MdOutlineTour className="h-6 w-6" />
                <span className="pl-3">Add Tours</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;