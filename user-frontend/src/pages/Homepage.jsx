import React from "react";
import { Link } from "react-router-dom";
import MovieList from "../components/List/MovieList";
import Footer from "../components/Footer/Footer";
import ModernCarousel from "../components/carousel/Carousel";
import posterImage from "../assets/poster.jpg";
import posterImage2 from "../assets/poster2.png";
import posterImage3 from "../assets/poster3.jpg";
import Newsletter from "../components/Newsletter/Newsletter";


const Homepage = () => {
  const carouselSlides = [
    {
      image: posterImage2,
      title: "Coming Soon",
      subtitle: "Zaalima",
    },
    {
      image: posterImage,
      title: "Now Showing",
      subtitle: "Draupadi",
    },
    
    {
      image: posterImage3,
      title: "Featured",
      subtitle: "Must Watch",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center p-5 bg-gray-800">
        <h1 className="text-2xl font-bold">QFX Cinemas</h1>
        <nav className="flex items-center">
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

      {/* Modern Carousel */}
      <ModernCarousel slides={carouselSlides} />

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

      {/* Movie List */}
      <MovieList />
      <Newsletter/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
