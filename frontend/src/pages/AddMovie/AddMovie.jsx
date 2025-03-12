import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMovie = () => {
  const navigate = useNavigate();
  const accessAdmin = localStorage.getItem("access-admin");

  useEffect(() => {
    if (!accessAdmin) {
      navigate("/admin/login"); // Redirect to login if not authenticated
    }
  }, [accessAdmin, navigate]);

  // State to handle movie form data
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    director: "",
    releaseDate: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/movies/", movieData, {
        headers: {
          Authorization: `Bearer ${accessAdmin}`,
        },
      });

      console.log("Movie Added:", res.data);
      alert("Movie added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding movie:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Add Movie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Title" value={movieData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="genre" placeholder="Genre" value={movieData.genre} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="director" placeholder="Director" value={movieData.director} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="date" name="releaseDate" value={movieData.releaseDate} onChange={handleChange} className="w-full p-2 border rounded" required />
          <textarea name="description" placeholder="Description" value={movieData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="imageUrl" placeholder="Image URL" value={movieData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
