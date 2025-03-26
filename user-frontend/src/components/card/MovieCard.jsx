import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden w-60">
      <img src={movie.image} alt={movie.title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h3 className="text-white text-lg font-bold">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;
