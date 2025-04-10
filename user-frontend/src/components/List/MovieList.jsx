import React, { useState } from "react";
import useMovies from "../../hooks/useMovies";
import MovieCard from "../card/MovieCard";
import usePagination from "../../hooks/usePagination";

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;
  const { movies, loading, pagination } = usePagination(currentPage, moviesPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get the range of page numbers to display
  const getPageNumbers = () => {
    const delta = 1;
    let pages = [];

    if (currentPage > 2) {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(pagination.totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < pagination.totalPages - 1) {
      if (currentPage < pagination.totalPages - 2) {
        pages.push("...");
      }
      pages.push(pagination.totalPages);
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-white text-center">Now Showing</h2>

      {/* Movie Grid */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white">No movies available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors`}
          >
            Previous
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => (typeof page === "number" ? paginate(page) : null)}
              className={`px-4 py-2 rounded-md ${
                page === currentPage
                  ? "bg-red-700"
                  : page === "..."
                  ? "bg-gray-600 cursor-default"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white transition-colors`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === pagination.totalPages
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors`}
          >
            Next
          </button>
        </div>
      )}

      {/* Page Information */}
      <div className="text-center text-gray-400 mt-4">
        Page {currentPage} of {pagination.totalPages} 
        ({pagination.totalMovies} total movies)
      </div>
    </div>
  );
};

export default MovieList;
