import React, { useState } from "react";
import axios from "axios";

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
    console.log("handle change called");
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(movieData).forEach((key) => formData.append(key, movieData[key]));
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/movies/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Movie Added:", res.data);
      alert("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="duration" placeholder="Duration" onChange={handleChange} required />
      <input type="date" name="release_date" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
