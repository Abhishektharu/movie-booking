import React from "react";
import { Link } from 'react-router-dom';
import { getImageUrl } from "../../utils/api.js";

const MyCard = ({ movie }) => {
  return (
    <div className="bg-black text-white rounded shadow p-4">
      {movie.map(movie => (
                <div key={movie.id} className="bg-black text-white rounded shadow p-4">
                  {/* <img src={movie.image_url} alt={movie.title} className="w-full h-48 object-cover rounded" /> */}
                  <img 
                    src={getImageUrl(movie.image_url)} 
                    alt={movie.title} 
                    className="w-full h-48 object-cover rounded" 
                  />
                  <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
                  <p>{movie.genre}</p>
                  <Link to={`/movies/${movie.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                    View Details
                  </Link>
                </div>
              ))}
    </div>
  );
};

export default MyCard;
