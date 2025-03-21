import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBackend } from "../../utils/api";

const AddShowtime = () => {
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
    setSuccess(false);

    try {
      // Format show_date to YYYY-MM-DD
      const formattedShowtime = {
        ...showtime,
        show_date: showtime.show_date.toISOString().split("T")[0], // Extracts only the date
      };

      await axios.post(getBackend("/api/showtimes"), formattedShowtime);
      setSuccess(true);

      // Reset form
      setShowtime({
        movie_id: "",
        theater_id: "",
        show_date: new Date(),
        show_time: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding showtime:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Showtime
        </h2>

        {success && (
          <div className="text-green-600 text-center font-semibold mb-4">
            ✅ Showtime added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Movie Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">
              Select Movie
            </label>
            <select
              name="movie_id"
              value={showtime.movie_id}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>

          {/* Theater Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">
              Select Theater
            </label>
            <select
              name="theater_id"
              value={showtime.theater_id}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a theater</option>
              {theaters.map((theater) => (
                <option key={theater.id} value={theater.id}>
                  {theater.name} - {theater.location}
                </option>
              ))}
            </select>
          </div>

          {/* Show Date Picker */}
          <div>
            <label className="block text-gray-700 font-medium">Show Date</label>
            <DatePicker
              selected={showtime.show_date}
              onChange={handleDateChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>

          {/* Show Time Input */}
          <div>
            <label className="block text-gray-700 font-medium">Show Time</label>
            <input
              type="time"
              name="show_time"
              value={showtime.show_time}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-gray-700 font-medium">
              Ticket Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={showtime.price}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter price"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span>
            ) : (
              "Add Showtime"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShowtime;
