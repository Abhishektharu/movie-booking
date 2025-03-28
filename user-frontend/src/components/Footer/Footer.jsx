import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div>
            <h1 className="text-3xl font-bold text-white">MY Cinemas</h1>
          </div>

          {/* QFX Cinemas Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">MY CINEMAS</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Advertise With Us</a></li>
              <li><a href="#" className="hover:text-white">Become a Franchise</a></li>
              <li><a href="#" className="hover:text-white">Loyalty Program</a></li>
              <li><a href="#" className="hover:text-white">Movies</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* What's ON */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">What's ON</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Now Showing</a></li>
              <li><a href="#" className="hover:text-white">Coming Soon</a></li>
            </ul>
          </div>

          {/* Stay in Touch */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">STAY IN TOUCH</h2>
            <div className="flex flex-col space-y-3">
              <a href="mailto:marketing@mycinemas.com" className="flex items-center bg-red-600 px-4 py-2 rounded hover:bg-red-500">
                📧 marketing@mycinemas.com
              </a>
              <a href="#" className="flex items-center bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                ❓ FAQ
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 text-xl">
              <a href="#" className="hover:text-white"><FaInstagram /></a>
              <a href="#" className="hover:text-white"><FaFacebookF /></a>
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaYoutube /></a>
              <a href="#" className="hover:text-white"><FaTiktok /></a>
            </div>
          </div>
        </div>

        {/* App Store Links */}
        <div className="mt-10 flex justify-center space-x-4">
          <a href="#">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-12" />
          </a>
          <a href="#">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-12" />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center border-t border-gray-700 pt-5 text-sm">
          <p>© All Rights Reserved By: MY Cinemas</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-white"> Terms & Conditions </a>
            <a href="#" className="hover:text-white"> Privacy Policy </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
