import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBackend } from "../../utils/api";
import { useNavigate } from 'react-router-dom';

const AddShowtime = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [showtime, setShowtime] = useState({
    movie_id: "",
    theater_id: "",
    show_date: new Date(),
    show_time: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch movies & theaters on load
  useEffect(() => {
    axios
      .get(getBackend("/api/movies"))
      .then((movieRes) => {
        setMovies(movieRes.data);
        return axios.get(getBackend("/api/theaters"));
      })
      .then((theaterRes) => {
        setTheaters(theaterRes.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setShowtime({ ...showtime, [e.target.name]: e.target.value });
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setShowtime({ ...showtime, show_date: date });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Format show_date to YYYY-MM-DD
      const formattedShowtime = {
        ...showtime,
        show_date: showtime.show_date.toISOString().split("T")[0], // Extracts only the date
      };

      await axios.post(getBackend("/api/showtimes"), formattedShowtime);
      setSuccess(true);

      // Add a slight delay before navigation for better UX
      setTimeout(() => {
        navigate('/admin/all-movies');
      }, 1500);

      // Reset form
      setShowtime({
        movie_id: "",
        theater_id: "",
        show_date: new Date(),
        show_time: "",
        price: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add showtime');
      console.error("Error adding showtime:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-t-2xl shadow-sm p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Add New Showtime</h2>
          <p className="mt-2 text-gray-600">Schedule a new movie showing</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-b-2xl shadow-sm p-6 space-y-6">
          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Showtime added successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Movie Selection */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Movie</label>
                <select
                  name="movie_id"
                  value={showtime.movie_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a movie</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theater Selection */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Theater</label>
                <select
                  name="theater_id"
                  value={showtime.theater_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a theater</option>
                  {theaters.map((theater) => (
                    <option key={theater.id} value={theater.id}>
                      {theater.name} - {theater.location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Picker */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Date</label>
                <DatePicker
                  selected={showtime.show_date}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Time Input */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Time</label>
                <input
                  type="time"
                  name="show_time"
                  value={showtime.show_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Ticket Price ($)</label>
              <input
                type="number"
                name="price"
                value={showtime.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Adding Showtime...</span>
                </>
              ) : (
                "Add Showtime"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddShowtime;
