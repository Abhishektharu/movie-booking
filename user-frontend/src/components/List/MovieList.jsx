import React from "react";
import MovieCard from "../card/MovieCard";

const movies = [
  {
    title: "Snow White",
    genre: "English | Adventure, Romance, Family, Musical",
    image: "https://via.placeholder.com/300x400", // Replace with actual image URL
  },
  {
    title: "Draupadi",
    genre: "Nepali | Social Drama",
    image: "https://via.placeholder.com/300x400",
  },
  {
    title: "11:55",
    genre: "Nepali | Thriller, Drama",
    image: "https://via.placeholder.com/300x400",
  },
  {
    title: "Anjila",
    genre: "Nepali | Biography, Drama",
    image: "https://via.placeholder.com/300x400",
  },
  {
    title: "Outlaw - Dafa 219",
    genre: "Nepali | Action, Drama",
    image: "https://via.placeholder.com/300x400",
  },
];

const MovieList = () => {
  return (
    <div className="bg-gray-800 min-h-screen p-10">
      <h2 className="text-white text-2xl font-bold mb-6">Now Showing</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
