import React from "react";
import { Link } from "react-router-dom";
import MovieList from "../components/List/MovieList";

const Homepage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center p-5 bg-gray-800">
        <h1 className="text-2xl font-bold">Duplicate QFX Cinemas</h1>
        <div>
          <select className="bg-gray-700 p-2 rounded">
            <option>Kathmandu</option>
            <option>Pokhara</option>
            <option>Butwal</option>
          </select>
        </div>
        <nav>
          <Link to="#" className="mx-2 text-gray-300 hover:text-white">
            Offers
          </Link>
          <Link to="#" className="mx-2 text-gray-300 hover:text-white">
            Movies
          </Link>
          <Link to="#" className="mx-2 text-gray-300 hover:text-white">
            Schedule
          </Link>

      <Link to="/user/register">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded ml-4">
          Register
        </button>
      </Link>
      <Link to="/user/login">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded ml-4">
          Login
        </button>
      </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1600x800')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="text-center z-10">
          <h2 className="text-4xl font-bold">Now Showing</h2>
          <h1 className="text-6xl font-extrabold mt-2">Draupadi</h1>
          <button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-lg rounded">
            Buy Now
          </button>
        </div>
      </div>

      {/* Movie Details */}
      <section className="p-10 text-center">
        <h2 className="text-3xl font-bold">Upcoming Movie</h2>
        <p className="text-lg mt-2">In Cinemas March 21</p>
        <div className="flex justify-center mt-6">
          <img
            src="https://via.placeholder.com/600x300"
            alt="Movie Poster"
            className="rounded-lg shadow-lg"
          />
        </div>

      </section>
      <div>
        <MovieList />
      </div>
    </div>
  );
};

export default Homepage;