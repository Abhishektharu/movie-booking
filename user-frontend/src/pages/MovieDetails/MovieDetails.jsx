import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useShowTimeByMovId from "../../hooks/useShowTimeByMovId";
import useMoviesById from "../../hooks/useMoviesById";
import BookBtn from "../../components/Buttons/BookBtn";
import { getImageUrl, showDate } from "../../utils/api.js";
import axios from "axios";
import { getBackend } from "../../utils/api";
import Modal from "../../components/Modal/Modal";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { movie, refetch } = useMoviesById(id);
  const { showtimes } = useShowTimeByMovId(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    release_date: "",
  });

  // Open modal and set initial form data
  const handleEditMovie = () => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        duration: movie.duration,
        release_date: movie.release_date,
      });
    }
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(getBackend(`/api/movies/${id}`), formData);
      refetch(); // Refetch movie details
      setIsModalOpen(false); // Close modal
      alert("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie.");
    }
  };

  if (!movie) return <p>Loading...</p>;

  const handleBookNow = (showId) => {
    navigate(`/seat-selection/${showId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={getImageUrl(movie.image_url)}
              alt={movie.title + " img"}
              className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold text-gray-800">{movie.title}</h1>
              <button
                onClick={handleEditMovie}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
              >
                Edit Movie
              </button>
            </div>

            <p className="mt-4 text-gray-600">{movie.description}</p>

            <div className="mt-6 space-y-2">
              <p className="text-gray-700">
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p className="text-gray-700">
                <strong>Duration:</strong> {movie.duration} minutes
              </p>
              <p className="text-gray-700">
                <strong>Release Date:</strong> {showDate(movie.release_date)}
              </p>
            </div>

            {/* Showtimes Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">Available Showtimes</h2>
              <ul className="mt-4 space-y-3">
                {showtimes.length > 0 ? (
                  showtimes.map((show) => (
                    <li
                      key={show.id}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <span className="text-gray-700">
                        {showDate(show.show_date)} at {show.show_time} - Rs {show.price}
                      </span>
                      <BookBtn
                        label="Book Now"
                        onClick={() => handleBookNow(show.id)}
                        className="ml-4"
                      />
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No showtimes available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Movie Details */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Edit Movie Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Release Date</label>
            <input
              type="date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Update Movie
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default MovieDetails;