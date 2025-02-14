// src/pages/MovieDetailsPage.js
// import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
import useShowTimeByMovId from '../../hooks/useShowTimeByMovId';
import useMoviesById from '../../hooks/useMoviesById';

function MovieDetails() {
  const { id } = useParams();
  // const [movie, setMovie] = useState(null);
  // const [showtimes, setShowtimes] = useState([]);

  // useEffect(() => {
  //   // Fetch movie details
  //   axios.get(`http://localhost:5000/api/movies/${id}`)
  //     .then(response => setMovie(response.data))
  //     .catch(error => console.error('Error fetching movie details:', error));

  //   // Optionally, fetch showtimes for this movie (assuming you have an endpoint)
  //   axios.get(`http://localhost:5000/api/showtimes?movie_id=${id}`)
  //     .then(response => setShowtimes(response.data))
  //     .catch(error => console.error('Error fetching showtimes:', error));
  // }, [id]);

  const {movie} = useMoviesById(id);
  const {showtimes} = useShowTimeByMovId(id);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img src={movie.image_url} alt={movie.title + " img"} className="w-full md:w-1/3 h-auto rounded" />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2">{movie.description}</p>
          <p className="mt-2"><strong>Genre:</strong> {movie.genre}</p>
          <p className="mt-2"><strong>Duration:</strong> {movie.duration} minutes</p>
          <p className="mt-2"><strong>Release Date:</strong> {movie.release_date}</p>

          <h2 className="text-2xl font-semibold mt-6">Showtimes</h2>
          <ul>
            {showtimes.length > 0 ? (
              showtimes.map(show => (
                <li key={show.id} className="mt-2">
                  {show.show_date} at {show.show_time} - Rs {show.price}
                  <Link to={`/seat-selection/${show.id}`} className="ml-4 text-blue-500 hover:underline">
                    Book Now
                  </Link>
                </li>
              ))
            ) : (
              <li>No showtimes available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
