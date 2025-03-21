import React, { useState } from "react";
import axios from "axios";
import {getBackend} from "../../utils/api"

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    release_date: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(movieData).forEach((key) => formData.append(key, movieData[key]));
    formData.append("image", image);

    try {
      const res = await axios.post(getBackend("/api/movies/"), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Movie Added:", res.data);
      alert("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Add New Movie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter movie title" 
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
              placeholder="Enter genre" 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea 
              name="description" 
              placeholder="Enter movie description" 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Duration (in minutes)</label>
            <input 
              type="number" 
              name="duration" 
              placeholder="Enter duration" 
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
              onChange={handleChange} 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Movie Poster</label>
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              onChange={handleFileChange} 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
