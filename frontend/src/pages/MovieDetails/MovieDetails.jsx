import { useParams, Link, useNavigate } from "react-router-dom";
import useShowTimeByMovId from "../../hooks/useShowTimeByMovId";
import useMoviesById from "../../hooks/useMoviesById";
import BookBtn from "../../components/Buttons/BookBtn";
import {getImageUrl} from "../../utils/api.js"

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { movie } = useMoviesById(id);
  const { showtimes } = useShowTimeByMovId(id);

  if (!movie) return <p>Loading...</p>;

  const handleBookNow = (showId) => {
    navigate(`/seat-selection/${showId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={getImageUrl(movie.image_url)}
          alt={movie.title + " img"}
          className="w-full md:w-1/3 h-auto rounded"
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2">{movie.description}</p>
          <p className="mt-2">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className="mt-2">
            <strong>Duration:</strong> {movie.duration} minutes
          </p>
          <p className="mt-2">
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <h2 className="text-2xl font-semibold mt-6">Available Showtimes</h2>
          <ul>
            {showtimes.length > 0 ? (
              showtimes.map((show) => (
                <li key={show.id} className="mt-2 flex items-center">
                  <span>
                    {show.show_date} at {show.show_time} - Rs {show.price}
                  </span>
                  <BookBtn
                    label="Book Now"
                    onClick={() => handleBookNow(show.id)}
                    className="ml-4"
                  />
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
