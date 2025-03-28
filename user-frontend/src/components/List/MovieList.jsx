import React, { useState } from "react";
import useMovies from "../../hooks/useMovies";
import MovieCard from "../card/MovieCard";

const MovieList = () => {
  const { movies, loading } = useMovies();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  // Calculate pagination values
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Get the range of page numbers to display
  const getPageNumbers = () => {
    const delta = 1; // Number of pages to show before and after current page
    let pages = [];

    // Always add first page
    if (currentPage > 2) {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      pages.push(i);
    }

    // Always add last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return <p className="text-center text-white">Loading movies...</p>;
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-white text-center">Now Showing</h2>
      
      {/* Movie Grid */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white">No movies available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
          >
            Previous
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? paginate(page) : null}
              className={`px-4 py-2 rounded-md ${
                page === currentPage
                  ? 'bg-red-700'
                  : page === '...'
                  ? 'bg-gray-600 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
          >
            Next
          </button>
        </div>
      )}

      {/* Page Information */}
      <div className="text-center text-gray-400 mt-4">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default MovieList;