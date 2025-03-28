import React from "react";
import useMovies from "../../hooks/useMovies";
import MovieCard from "../card/MovieCard";


const MovieList = () => {
  const { movies, loading } = useMovies();

  if (loading) {
    return <p className="text-center text-white">Loading movies...</p>;
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-white text-center">Now Showing</h2>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white">No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
