import React from "react";
import { Link } from 'react-router-dom';
import {getImageUrl} from "../../utils/api.js"
const MovieCard = ({ movie }) => {
  console.log(movie);
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden w-60">
      <img src={getImageUrl(movie.image_url)} alt={movie.title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h3 className="text-white text-lg font-bold">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.genre}</p>
        <Link to={`/movies/${movie.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
              View Details
            </Link>
      </div>
    </div>
  );
};

export default MovieCard;
