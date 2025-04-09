import React, { useState } from "react";
import axios from "axios";
import { getBackend } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();

  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", 
    "Documentary", "Drama", "Fantasy", "Horror", "Mystery",
    "Romance", "Sci-Fi", "Thriller"
  ];

  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    release_date: "",
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview URL for image
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(movieData).forEach((key) => formData.append(key, movieData[key]));
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(getBackend("/api/movies/"), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Movie Added:", res.data);
      alert("Movie added successfully!");
      setTimeout(()=>{
        navigate("/admin/all-movies")
      }, 2000);

    } catch (error) {
      console.error("Error adding movie:", error.response?.data || error.message);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* More compact header */}
        <div className="bg-white rounded-t-xl shadow-sm p-4 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800">Add New Movie</h2>
          <p className="text-sm text-slate-600">Create a new movie listing</p>
        </div>

        <div className="bg-white rounded-b-xl shadow-sm p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - More compact image upload */}
            <div className="w-full">
              {previewUrl ? (
                <div className="relative group">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-[400px] object-cover rounded-lg shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <label className="px-3 py-2 bg-white rounded-md shadow cursor-pointer hover:bg-slate-50">
                      Change Image
                      <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="hidden"/>
                    </label>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center h-[400px] cursor-pointer hover:border-slate-300">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-slate-600">Click to upload movie poster</p>
                  <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF</p>
                  <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="hidden"/>
                </label>
              )}
            </div>

            {/* Right Side - More compact form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Title and Genre in same row */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-sm font-medium text-slate-700">Movie Title</label>
                    <input 
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-sm font-medium text-slate-700">Genre</label>
                    <select
                      name="genre"
                      onChange={handleChange}
                      value={movieData.genre}
                      required
                      className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select genre</option>
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea 
                    name="description"
                    placeholder="Enter movie description"
                    onChange={handleChange}
                    required
                    rows="4"
                    className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Duration and Release Date in same row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Duration (mins)</label>
                    <input 
                      type="number"
                      name="duration"
                      placeholder="Duration"
                      min="1"
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Release Date</label>
                    <input 
                      type="date"
                      name="release_date"
                      onChange={handleChange}
                      min={today}
                      required
                      className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mt-4"
                >
                  Add Movie
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;