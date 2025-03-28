import React, { useState } from "react";
import axios from "axios";
import { getBackend } from "../../utils/api";
import { toast } from "react-toastify";

const AddMovie = () => {
  // Predefined genres
  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Drama", "Fantasy", "Horror", "Mystery", "Romance",
    "Sci-Fi", "Thriller"
  ];

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Initial state
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    genre: genres[0],
    duration: "",
    release_date: today,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateInput = (name, value) => {
    switch (name) {
      case 'title':
        return value.length <= 20;
      case 'description':
        return value.length <= 50;
      case 'duration':
        const duration = parseInt(value);
        return !isNaN(duration) && duration >= 30 && duration <= 240;
      case 'release_date':
        return new Date(value) >= new Date(today);
      default:
        return true;
    }
  };

  const getErrorMessage = (name, value) => {
    switch (name) {
      case 'title':
        return value.length > 20 ? 'Title must be 20 characters or less' : '';
      case 'description':
        return value.length > 50 ? 'Description must be 50 characters or less' : '';
      case 'duration':
        const duration = parseInt(value);
        return !isNaN(duration) && (duration < 30 || duration > 240) 
          ? 'Duration must be between 30 and 240 minutes' : '';
      case 'release_date':
        return new Date(value) < new Date(today) 
          ? 'Release date cannot be in the past' : '';
      default:
        return '';
    }
  };

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = getErrorMessage(name, value);
    
    if (!error) {
      setMovieData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: '' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5242880) { // 5MB limit
        setErrors(prev => ({ 
          ...prev, 
          image: 'Image size should be less than 5MB' 
        }));
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let newErrors = {};
    Object.keys(movieData).forEach(key => {
      const error = getErrorMessage(key, movieData[key]);
      if (error) newErrors[key] = error;
    });

    if (!image) newErrors.image = 'Movie poster is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(movieData).forEach(key => formData.append(key, movieData[key]));
      formData.append("image", image);

      const res = await axios.post(getBackend("/api/movies/"), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast.success("Movie added successfully!");
      
      // Reset form
      setMovieData({
        title: "",
        description: "",
        genre: genres[0],
        duration: "",
        release_date: today,
      });
      setImage(null);
      setPreview(null);
      setErrors({});
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Add New Movie
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              {preview ? (
                <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-6">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                    id="poster-upload"
                  />
                  <label
                    htmlFor="poster-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-500">Click to upload movie poster</span>
                  </label>
                  {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Movie Title (max 20 characters)"
                  value={movieData.title}
                  onChange={handleChange}
                  maxLength={20}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex justify-between mt-1">
                  <small className="text-red-500">{errors.title}</small>
                  <small className="text-gray-500">{movieData.title.length}/20</small>
                </div>
              </div>

              <select
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>

              <div>
                <input
                  type="number"
                  name="duration"
                  placeholder="Duration (30-240 minutes)"
                  value={movieData.duration}
                  onChange={handleChange}
                  min="30"
                  max="240"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.duration && <small className="text-red-500">{errors.duration}</small>}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="date"
                  name="release_date"
                  value={movieData.release_date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.release_date && <small className="text-red-500">{errors.release_date}</small>}
              </div>

              <div>
                <textarea
                  name="description"
                  placeholder="Movie Description (max 50 characters)"
                  value={movieData.description}
                  onChange={handleChange}
                  maxLength={50}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex justify-between mt-1">
                  <small className="text-red-500">{errors.description}</small>
                  <small className="text-gray-500">{movieData.description.length}/50</small>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="md:col-span-2 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Movie..." : "Add Movie"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;